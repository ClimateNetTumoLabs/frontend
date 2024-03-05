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

const MapArmenia = () => {
  const [devices, setDevices] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const { position} = useContext(PositionContext);


  const ToggleScroll = () => {
    const map = useMapEvents({
      click: () => {
        setScrollEnabled((prev) => !prev);
      },
      zoom: () => {
        if (!scrollEnabled) {
          map.setZoom(map.getZoom());
        }
      },
    });

    map.scrollWheelZoom.disable();
    map.scrollWheelZoom[scrollEnabled ? "enable" : "disable"]();
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
    iconAnchor: [18, 18],
    popupAnchor: [0, -15],
    className: `${styles.blinking}`
  });

  useEffect(() => {
    axios.get(`/devices/`)
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div id="Map" >
      <div className={styles.map_section}>
        <h2 className={styles.map_header}>Map</h2>
        <p>The highlighted locations indicate the current active climate devices. Click on a location to access the dataset specific to that device.</p>
      </div>
      <MapContainer
        center={[40.15912, 45.002717]}
        zoom={8}
        style={{ height: "600px", width: "100%"}}
        className={styles.mapContainer}
      >
        <ToggleScroll />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
        {
          position && position.latitude !== null && position.longitude !== null && (
            <Marker
              icon={blinkIcon}
              position={[parseFloat(position.latitude), parseFloat(position.longitude)]}
            >
              <Popup>
                <Link>Your Location </Link>
              </Popup>
            </Marker>
          )
        }
        <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
        <FullscreenControl forceSeparateButton={true} position={"topright"} />
        <Routes>
          <Route path="/device/:id" element={<InnerPage/>} />
        </Routes>
      </MapContainer>
    </div>
  );
};

export default MapArmenia;