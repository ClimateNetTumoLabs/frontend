import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, useMapEvents, useMap, Marker } from "react-leaflet";
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
import "./Map.module.css"
import { PositionContext } from "../../context/PositionContext";
import clickIcon from "../../assets/Icons/tap.png"
import { Polygon } from "react-leaflet";
import { useTranslation } from "react-i18next";
import ResetViewControl from '@20tab/react-leaflet-resetview';

function circleWithText2(latLng, txt, radius, borderWidth) {
	var size = radius;
	var iconSize = size + (borderWidth * 2);
	var textSize = '16px'
	var icon = L.divIcon({
		html: '<div style="width: ' + iconSize + 'px; height: ' + iconSize + 'px; border-radius: 50%; background-color: rgba(93, 76, 220, 0.8); display: flex; justify-content: center; align-items: center; font-size: ' + textSize + 'px;">' + txt + '</div>',
		className: '',
		iconSize: [iconSize, iconSize]
	});
	var marker = L.marker(latLng, {
		icon: icon
	});
	return marker;
}

const PolygonWithText = ({ coords, text }) => {
	const map = useMap();
	const center = L.latLng(coords[0], coords[1]);

	useEffect(() => {
		const marker = circleWithText2(center, text, 20, 1);
		marker.addTo(map);
		return () => {
			map.removeLayer(marker);
		};
	}, [center, text, map]);

	return (
		<Polygon color="blue" positions={[center]} />
	);
}

// const ResetViewControl = () => {
// 	const map = useMap();
//
// 	useEffect(() => {
// 		const resetControl = L.control({ position: "topright" });
//
// 		resetControl.onAdd = () => {
// 			const container = L.DomUtil.create("div", "leaflet-control-reset-view leaflet-bar");
// 			container.innerHTML = "&#x21bb;"; // Unicode symbol for a circular arrow
// 			container.title = "Reset View";
// 			container.onclick = () => map.setView(INITIAL_CENTER, INITIAL_ZOOM);
// 			return container;
// 		};
//
// 		resetControl.addTo(map);
// 	}, [map]);
//
// 	return null;
// };

const MapArmenia = () => {
	const { t, i18n } = useTranslation();
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
		"Tavush": [40.878000, 45.143717],
		"Vayots Dzor": [39.7559, 45.3396],
		"Yerevan": [40.1812, 44.5136],
		"USA": [40.74203956277504, -74.00782899150899]
	};

	useEffect(() => {
		calculateRegionDevices(devices);
	}, [devices, zoomLevel]);


	useEffect(() => {
		setShowMessage(false);
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

	const calculateRegionDevices = async (devices) => {
		const regions = {};
		for (const device of devices) {
			const regionName = device.parent_name;
			if (regionName !== "Unknown") {
				regions[regionName] = regions[regionName] ? regions[regionName] + 1 : 1;
			}
		}
		setRegionDevices(regions);
	};

	useEffect(() => {
		axios.get(`/device_inner/list/`)
			.then(response => {
				setDevices(response.data);
				calculateRegionDevices(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return (
		<div id="Map" style={{ cursor: 'pointer' }}>
			<div className={styles.map_section}>
				<h2 className={styles.map_header}>{t('map.mapHeader')}</h2>
				<p>{t('map.mapDescription')}</p>
			</div>
			<MapContainer
				center={[40.15912, 45.002717]}
				zoom={8}
				style={{
					height: "600px", width: "100%",
					cursor: 'pointer'
				}}
				className={`${styles.mapContainer}`}
				onMouseWheel={handleMessage}
				scrollWheelZoom={showMessage ? "enabled" : "disabled"}
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
								<PolygonWithText key={region} className={styles.circleMarker} coords={regionCoordinates} text={count} />
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
									<Link to={`/${i18n.language}/device/${device.generated_id}/?${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}`}>{device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</Link>
								</Popup>
							</Marker>
						))}
						{
							position && position.latitude !== null && position.longitude !== null && (
								<Marker
									ref={markerRef}
									position={position && position.latitude !== null && position.longitude !== null ? [parseFloat(position.latitude), parseFloat(position.longitude)] : [0, 0]}
									icon={blinkIcon}
								>
								</Marker>
							)
						}
					</>
				)}
				{
					position && position.latitude !== null && position.longitude !== null && (
						<Marker
							ref={markerRef}
							position={position && position.latitude !== null && position.longitude !== null ? [parseFloat(position.latitude), parseFloat(position.longitude)] : [0, 0]}
							icon={blinkIcon}
						>
						</Marker>
					)
				}
				<GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
				<FullscreenControl forceSeparateButton={true} position={"topright"} />
                <ResetViewControl
                                title="Reset view"
                                position={"topright"}
                                icon="url(https://images-in-website.s3.us-east-1.amazonaws.com/Icons/synchronize.png)"
                />
				<Routes>
					<Route path="/device/:id" element={<InnerPage />} />
				</Routes>
				{showMessage && (
					<div
						className={styles.messageBox}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: 'rgba(255, 255, 255, 0.4)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: 1000,
						}}
					>
						<span >
							{t('map.clickOnMap')}
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
