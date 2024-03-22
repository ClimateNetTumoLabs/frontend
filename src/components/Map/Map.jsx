import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, useMapEvents, Marker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../assets/Icons/map-marker.svg";
import location from "../../assets/Icons/circle.jpeg"
import armeniaGeoJSON from "../../armenia.json";
import { Link, Route, Routes } from "react-router-dom";
import InnerPage from "../InnerPage/InnerPage";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import styles from "./Map.module.css";
import { PositionContext } from "../../context/PositionContext";
import clickIcon from "../../assets/Icons/tap.png"
import iconUrl2 from "../../assets/Icons/wind_arrow.png";
import { CircleMarker, Tooltip } from "react-leaflet";

const MapArmenia = () => {
    const [devices, setDevices] = useState([]);
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const { position } = useContext(PositionContext);
    const [showMessage, setShowMessage] = useState(true);
    const markerRef = useRef(null);
    const [regionDevices, setRegionDevices] = useState({});
    const [zoomLevel, setZoomLevel] = useState(8)
    const regionCoordinatesMap = {
        "Aragatsotn": [40.5233, 44.4784],
        "Ararat": [39.8303, 44.7023],
        "Armavir": [40.1526, 44.0345],
        "Gegharkunik": [40.3961, 45.2881],
        "Kotayk": [40.3289, 44.6089],
        "Lori": [41.0645, 44.5244],
        "Shirak": [40.8579, 43.8975],
        "Syunik": [39.4392, 46.1346],
        "Tavush": [41.0466, 45.3522],
        "Vayots Dzor": [39.7559, 45.3396],
        "Yerevan": [40.1812, 44.5136]
    };

    useEffect(() => {
        calculateRegionDevices(devices);
    }, [devices, zoomLevel]);


    useEffect(() => {
        const idleTimer = setTimeout(() => {
            setShowMessage(false);
        }, 5000);

        return () => clearTimeout(idleTimer);
    }, []);

    const handleMessage = () => {
        setShowMessage(scrollEnabled);
    };

    const handleZoom = (map) => {
        setZoomLevel(map.getZoom());
    };

    const ToggleScroll = () => {
        const map = useMapEvents({
            click: () => {
                setScrollEnabled((prev) => !prev);
                handleMessage();
            },
            zoom: () => {
                if (!scrollEnabled) {
                    map.setZoom(map.getZoom());

                }
            },
        });

        map.scrollWheelZoom.disable();
        map.scrollWheelZoom[scrollEnabled ? "enable" : "disable"]();
        map.on('zoom', () => handleZoom(map));
        return null;
    };

    const geoJSONStyle = {
        fillColor: "green",
        fillOpacity: "0.1",
        color: "black",
        weight: 3,
    };

    const customIcon = new L.Icon({
        iconUrl,
        iconSize: [25, 25],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    });

    const blinkIcon = new L.Icon({
        iconUrl: location,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -15],
        className: `${styles.blinking}`
    });

    const clusterIcon = new L.Icon({
        iconUrl: iconUrl2,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    });

    const calculateRegionDevices = async (devices) => {
        const regions = {};
        for (const device of devices) {
            const regionName = device.parent_name;
            if (regionName != "Unknown") {
                regions[regionName] = regions[regionName] ? regions[regionName] + 1 : 1;
            }
        }
        setRegionDevices(regions);
    };

    useEffect(() => {
        axios.get(`/devices/`)
            .then(response => {
                setDevices(response.data);
                calculateRegionDevices(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log("Devices ", JSON.stringify(devices, null, 2))
    return (
        <div id="Map" >
            <div className={styles.map_section}>
                <h2 className={styles.map_header}>Map</h2>
                <p>The highlighted locations indicate the current active climate devices. Click on a location to access the dataset specific to that device.</p>
            </div>
            <MapContainer
                center={[40.15912, 45.002717]}
                zoom={8}
                style={{
                    height: "600px", width: "100%",
                }}
                className={`${styles.mapContainer}`}
                onMouseWheel={handleMessage}
            >
                <ToggleScroll />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {zoomLevel < 9 ? (
                    <>
                        {Object.entries(regionDevices).map(([region, count]) => {
                            const regionCoordinates = regionCoordinatesMap[region];
                            if (!regionCoordinates) return null;

                            return (
                                <CircleMarker
                                    key={region}
                                    center={regionCoordinates}
                                    radius={12}
                                    fillColor="blue"
                                    color="black"
                                    weight={1}
                                    fillOpacity={0.5}
                                >
                                    <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
                                        <p>{count}</p>
                                    </Tooltip>
                                    <Popup>{count} devices</Popup>
                                </CircleMarker>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {devices.map(device => (
                            <Marker
                                key={device.id}
                                position={[parseFloat(device.latitude), parseFloat(device.longitude)]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <Link to={`/device_cl/${device.generated_id}?${device.name}`}>{device.name}</Link>
                                </Popup>
                            </Marker>
                        ))}
                    </>
                )}
                {
                    position && position.latitude !== null && position.longitude !== null && (
                        <Marker
                            ref={markerRef}
                            position={[parseFloat(position.latitude), parseFloat(position.longitude)]}
                            icon={blinkIcon}
                        >
                        </Marker>
                    )
                }
                <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
                <FullscreenControl forceSeparateButton={true} position={"topright"} />
                <Routes>
                    <Route path="/device/:id" element={<InnerPage />} />
                </Routes>
                {showMessage && (
                    <div
                        className="message-box"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <span>
                            Click on map to zoom in or out
                            <img className={`${styles.click_icon}`}
                                src={clickIcon} alt="Click icon"
                            />
                        </span>
                    </div>
                )}
            </MapContainer>
        </div>
    );
};

export default MapArmenia;