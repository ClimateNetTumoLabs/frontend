import { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents, useMap, Marker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../assets/Icons/map-marker.svg";
import location from "../../assets/Icons/circle.jpeg";
import armeniaGeoJSON from "../../armenia.json";
import { Link, Route, Routes } from "react-router-dom";
import InnerPage from "../InnerPage/InnerPage";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import styles from "./Map.module.css";
import { PositionContext } from "../../context/PositionContext";
import clickIcon from "../../assets/Icons/clickonIcon.png";
import { Polygon } from "react-leaflet";
import { useTranslation } from "react-i18next";
import ResetViewControl from '@20tab/react-leaflet-resetview';
import "leaflet.locatecontrol";
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-easybutton/src/easy-button.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function circleWithText2(latLng, txt, radius, borderWidth) {
    var size = radius;
    var iconSize = size + (borderWidth * 2);
    var textSize = '16px';
    var icon = L.divIcon({
        html: '<div style="width: ' + iconSize + 'px; height: ' + iconSize + 'px; border-radius: 50%; background-color: rgba(93, 76, 220, 0.8); display: flex; justify-content: center; align-items: center; font-size: ' + textSize + 'px; cursor: pointer;">' + txt + '</div>',
        className: '',
        iconSize: [iconSize, iconSize]
    });
    var marker = L.marker(latLng, {
        icon: icon
    });
    marker.bindPopup = () => marker;
    marker.on('popupopen', () => false);
    marker.unbindPopup();
    return marker;
}

const PolygonWithText = ({ coords, text, region }) => {
    const map = useMap();
    const markerRef = useRef(null);
    const center = coords && !isNaN(coords[0]) && !isNaN(coords[1]) ? L.latLng(coords[0], coords[1]) : null;

    useEffect(() => {
        if (!center) {
            console.warn(`Invalid coordinates for region ${region}:`, coords);
            return;
        }

        const marker = circleWithText2(center, text, 20, 1);
        markerRef.current = marker;

        marker.on('click', () => {
            console.log('Polygon marker clicked:', region, center);
            map.setView(center, 10);
        });

        marker.addTo(map);
        return () => {
            console.log('Removing polygon marker:', region);
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
                markerRef.current = null;
            }
        };
    }, [center, text, map, region]);

    const polygonCoords = center ? [
        [center.lat + 0.001, center.lng - 0.001],
        [center.lat + 0.001, center.lng + 0.001],
        [center.lat - 0.001, center.lng + 0.001],
        [center.lat - 0.001, center.lng - 0.001]
    ] : [];

    return center && polygonCoords.length ? (
        <Polygon
            color="blue"
            positions={polygonCoords}
            eventHandlers={{
                click: () => {
                    console.log('Polygon clicked:', region, center);
                    map.setView(center, 10);
                }
            }}
        />
    ) : null;
}

const usePopupManager = () => {
    const activePopupsRef = useRef(new Map());
    const timeoutsRef = useRef(new Map());

    const createPopup = (marker, content, options = {}) => {
        const markerId = marker._leaflet_id;
        clearPopup(markerId);
        
        const popup = L.popup({
            className: options.customClassName || styles.customPopup,
            closeButton: options.closeButton || false,
            autoClose: false,
            closeOnClick: false,
            interactive: true,
            ...options
        })
        .setLatLng(marker.getLatLng())
        .setContent(content)
        .openOn(marker._map);

        activePopupsRef.current.set(markerId, popup);
        return popup;
    };

    const clearPopup = (markerId) => {
        if (timeoutsRef.current.has(markerId)) {
            clearTimeout(timeoutsRef.current.get(markerId));
            timeoutsRef.current.delete(markerId);
        }

        if (activePopupsRef.current.has(markerId)) {
            const popup = activePopupsRef.current.get(markerId);
            if (popup._map) {
                popup._map.closePopup(popup);
            }
            activePopupsRef.current.delete(markerId);
        }
    };

    const schedulePopupClose = (markerId, delay = 200) => {
        if (timeoutsRef.current.has(markerId)) {
            clearTimeout(timeoutsRef.current.get(markerId));
        }

        const timeoutId = setTimeout(() => {
            clearPopup(markerId);
        }, delay);

        timeoutsRef.current.set(markerId, timeoutId);
    };

    const cancelPopupClose = (markerId) => {
        if (timeoutsRef.current.has(markerId)) {
            clearTimeout(timeoutsRef.current.get(markerId));
            timeoutsRef.current.delete(markerId);
        }
    };

    const cleanup = () => {
        timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutsRef.current.clear();
        activePopupsRef.current.forEach(popup => {
            if (popup._map) {
                popup._map.closePopup(popup);
            }
        });
        activePopupsRef.current.clear();
    };

    return {
        createPopup,
        clearPopup,
        schedulePopupClose,
        cancelPopupClose,
        cleanup
    };
};

const MapArmenia = () => {
    const { t, i18n } = useTranslation();
    const [devices, setDevices] = useState([]);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [showMessage, setShowMessage] = useState(true);
    const { position } = useContext(PositionContext);
    const markerRef = useRef(null);
    const [regionDevices, setRegionDevices] = useState({});
    const [zoomLevel, setZoomLevel] = useState(8);
    const mapRef = useRef(null);
    const popupManager = usePopupManager();
    const [isFetchingLatest, setIsFetchingLatest] = useState({});
    const intervalRef = useRef(null);

    const regionCoordinatesMap = {
        "Aragatsotn": [40.5233, 44.4784],
        "Ararat": [39.8303, 44.7023],
        "Armavir": [40.1526, 44.0345],
        "Gegharkunik": [40.3961, 45.2881],
        "Kotayk": [40.3289, 44.6089],
        "Lori": [40.9455, 44.5244],
        "Shirak": [40.8279, 43.8975],
        "Syunik": [39.4392, 46.1346],
        "Tavush": [40.95000, 45.101717],
        "Vayots Dzor": [39.7559, 45.4396],
        "Yerevan": [40.1812, 44.5136],
        "USA": [40.74203956277504, -74.00782899150899]
    };

    const armeniaCenter = [40.15912, 45.002717];

    useEffect(() => {
        calculateRegionDevices(devices);
    }, [devices, zoomLevel]);

    useEffect(() => {
        return () => {
            popupManager.cleanup();
        };
    }, []);

    const handleZoom = (map) => {
        console.log('Zoom changed:', map.getZoom());
        setZoomLevel(map.getZoom());
        popupManager.cleanup();
    };

    const ToggleScroll = () => {
        const map = useMapEvents({
            click: (e) => {
                console.log('Map clicked:', e.latlng);
                popupManager.cleanup();
                setShowMessage(true);
            },
            zoom: () => {
                handleZoom(map);
            },
            dblclick: (e) => {
                console.log('Map double-clicked, toggling scroll');
                setScrollEnabled((prev) => !prev);
                e.originalEvent.preventDefault();
            }
        });

        if (showMessage) {
            map.scrollWheelZoom.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
        } else {
            map.scrollWheelZoom[scrollEnabled ? "enable" : "disable"]();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
        }

        return null;
    };

    const calculateRegionDevices = (devices) => {
        const regions = {};
        for (const device of devices) {
            const regionName = device.parent_name;
            if (regionName !== "Unknown") {
                regions[regionName] = regions[regionName] ? regions[regionName] + 1 : 1;
            }
        }
        setRegionDevices(regions);
    };

    const createDevicePopupContent = (device, isClick = false) => {
        console.log('Creating popup for device:', device.id, {
            temperature: device.temperature,
            humidity: device.humidity,
            time: device.time
        });
        const isLoading = isFetchingLatest[device.generated_id];
        // Dynamic image source with fallback
        const imageSrc = `DeviceImages/${device.generated_id}.jpg`;
        const fallbackImageSrc = 'https://images-in-website.s3.us-east-1.amazonaws.com/Weather/device.svg';
        return `
            <div class="${styles.hoverCard}">
                <div class="${styles.imageZoomContainer}">
                    <img 
                        src="${imageSrc}" 
                        alt="${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}" 
                        class="${styles.deviceImage}"
                        onerror="this.src='${fallbackImageSrc}'; console.warn('Image not found: ${imageSrc}, using fallback: ${fallbackImageSrc}')"
                    />
                    <div class="${styles.zoomLens}"></div>
                    <div class="${styles.zoomResult}"></div>
                </div>
                <h3>${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</h3>
                ${isLoading ? `
                    <p>Loading...</p>
                ` : `
                    <p>${t('map.mapHumidity')}: ${device.humidity != null ? device.humidity : 'N/A'}%</p>
                    <p>${t('map.mapTemperature')}: ${device.temperature != null ? device.temperature : 'N/A'}°C</p>
                    <br/>
                    <p>${device.time != null ? device.time : 'N/A'}</p>
                `}
                <a href="/${i18n.language}/device/${device.generated_id}/?${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}">
                    ${isClick ? 'View Details' : 'Click for Details'}
                </a>
            </div>
        `;
    };

    const createLocationPopupContent = () => {
        return `
            <div class="${styles.locationHoverCard}">
                <img src="https://images-in-website.s3.us-east-1.amazonaws.com/Weather/location.svg" 
                     alt="${t('map.currentLocation')}" 
                     style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
                <h3>${t('map.currentLocation')}</h3>
                <p>${t('map.latitude')}: ${position.latitude || 'N/A'}</p>
                <p>${t('map.longitude')}: ${position.longitude || 'N/A'}</p>
                <a href="#">${t('map.viewDetails')}</a>
            </div>
        `;
    };

    const setupPopupEvents = (popup, markerId) => {
        const popupElement = popup.getElement();
        if (popupElement) {
            popupElement.addEventListener('mouseenter', () => {
                console.log('Popup mouseenter:', markerId);
                popupManager.cancelPopupClose(markerId);
            });
            
            popupElement.addEventListener('mouseleave', () => {
                console.log('Popup mouseleave:', markerId);
                popupManager.schedulePopupClose(markerId, 200);
            });

            // Initialize zoom effect for images
            const image = popupElement.querySelector(`.${styles.deviceImage}`);
            const lens = popupElement.querySelector(`.${styles.zoomLens}`);
            const result = popupElement.querySelector(`.${styles.zoomResult}`);
            if (image && lens && result) {
                const initializeZoom = () => {
                    const imgRect = image.getBoundingClientRect();
                    const lensRect = lens.getBoundingClientRect();
                    const resultRect = result.getBoundingClientRect();

                    const cx = resultRect.width / lensRect.width;
                    const cy = resultRect.height / lensRect.height;

                    result.style.backgroundImage = `url(${image.src})`;
                    result.style.backgroundSize = `${imgRect.width * cx}px ${imgRect.height * cy}px`;

                    const moveLens = (e) => {
                        e.preventDefault();
                        const pos = getCursorPos(e, image);
                        let x = pos.x - lensRect.width / 2;
                        let y = pos.y - lensRect.height / 2;

                        // Prevent lens from moving outside image
                        if (x < 0) x = 0;
                        if (y < 0) y = 0;
                        if (x > imgRect.width - lensRect.width) x = imgRect.width - lensRect.width;
                        if (y > imgRect.height - lensRect.height) y = imgRect.height - lensRect.height;

                        lens.style.left = `${x}px`;
                        lens.style.top = `${y}px`;
                        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
                    };

                    const getCursorPos = (e, img) => {
                        const rect = img.getBoundingClientRect();
                        return {
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top
                        };
                    };

                    image.addEventListener('mousemove', moveLens);
                    lens.addEventListener('mousemove', moveLens);
                    image.addEventListener('mouseenter', () => {
                        lens.style.display = 'block';
                        result.style.display = 'block';
                    });
                    image.addEventListener('mouseleave', () => {
                        lens.style.display = 'none';
                        result.style.display = 'none';
                    });
                };

                // Wait for image to load to get correct dimensions
                if (image.complete) {
                    initializeZoom();
                } else {
                    image.addEventListener('load', initializeZoom);
                }
            }
        }
    };

    useEffect(() => {
        // Fetch the device list only once on mount
        const fetchDeviceList = async () => {
            try {
                console.log('Fetching device list from /device_inner/list/');
                const deviceListResponse = await axios.get(`/device_inner/list/`);
                const deviceList = deviceListResponse.data.map(device => ({
                    ...device,
                    temperature: null,
                    humidity: null
                }));
                console.log('Device list fetched:', deviceList);
                setDevices(deviceList);
                setIsFetchingLatest(deviceList.reduce((acc, device) => ({
                    ...acc,
                    [device.generated_id]: false
                }), {}));
                await fetchLatestData(deviceList);
            } catch (error) {
                console.error('Error fetching device list:', error.response || error);
                setDevices([]);
                setIsFetchingLatest({});
            }
        };

        const fetchLatestData = async (deviceList) => {
            try {
                setIsFetchingLatest(prev => ({
                    ...prev,
                    ...deviceList.reduce((acc, device) => ({
                        ...acc,
                        [device.generated_id]: true
                    }), {})
                }));

                const devicePromises = deviceList.map(async (device) => {
                    try {
                        console.log(`Fetching latest data for device ${device.generated_id}`);
                        const latestResponse = await axios.get(`/device_inner/${device.generated_id}/latest/`);
                        console.log(`Latest data for device ${device.generated_id}:`, latestResponse.data);
                        if (latestResponse.data.length > 0) {
                            const apiTime = latestResponse.data[0].time;
                            const date = new Date(apiTime);
                            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                            return {
                                ...device,
                                temperature: latestResponse.data[0].temperature,
                                humidity: latestResponse.data[0].humidity,
                                time: formattedDate,
                            };
                        } else {
                            console.warn(`Empty response array for device ${device.generated_id}`);
                            return device;
                        }
                    } catch (error) {
                        console.error(`Error fetching latest data for device ${device.generated_id}:`, error.response || error);
                        return device;
                    }
                });

                const devicesWithLatest = await Promise.all(devicePromises);
                console.log('Devices with latest data:', devicesWithLatest);
                setDevices(devicesWithLatest);
                setIsFetchingLatest(prev => ({
                    ...prev,
                    ...deviceList.reduce((acc, device) => ({
                        ...acc,
                        [device.generated_id]: false
                    }), {})
                }));
            } catch (error) {
                console.error('Error fetching latest data:', error.response || error);
                setIsFetchingLatest(prev => ({
                    ...prev,
                    ...deviceList.reduce((acc, device) => ({
                        ...acc,
                        [device.generated_id]: false
                    }), {})
                }));
            }
        };

        const scheduleNextFetch = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const milliseconds = now.getMilliseconds();

            const minutesPastQuarter = minutes % 15;
            const minutesToNextQuarter = minutesPastQuarter === 0 ? 0 : 15 - minutesPastQuarter;
            const delayMilliseconds = (minutesToNextQuarter * 60 * 1000) - (seconds * 1000) - milliseconds;

            console.log(`Scheduling fetch in ${delayMilliseconds / 1000} seconds at ${new Date(now.getTime() + delayMilliseconds).toLocaleTimeString()}`);

            const timeoutId = setTimeout(() => {
                if (devices.length > 0) {
                    fetchLatestData(devices);
                }
                const intervalId = setInterval(() => {
                    if (devices.length > 0) {
                        fetchLatestData(devices);
                    }
                }, 15 * 60 * 1000);
                intervalRef.current = intervalId;
            }, delayMilliseconds > 0 ? delayMilliseconds : 0);

            return timeoutId;
        };

        fetchDeviceList();
        const timeoutId = scheduleNextFetch();

        return () => {
            console.log('MapArmenia unmounting');
            clearTimeout(timeoutId);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (markerRef.current && position && position.latitude !== null && position.longitude !== null) {
            const latLng = [parseFloat(position.latitude), parseFloat(position.longitude)];
            if (!isNaN(latLng[0]) && !isNaN(latLng[1])) {
                console.log('Updating blinkIcon marker position:', latLng);
                markerRef.current.setLatLng(latLng);
                markerRef.current.bindPopup(createLocationPopupContent(), {
                    className: styles.locationPopup,
                    closeButton: true
                });
            } else {
                console.warn('Invalid position coordinates:', latLng);
            }
        }
    }, [position]);

    useEffect(() => {
        const preventBrowserZoom = (e) => {
            if (showMessage && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventBrowserZoom, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventBrowserZoom);
        };
    }, [showMessage]);

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
        popupAnchor: [0, -15]
    });

    const blinkIcon = new L.Icon({
        iconUrl: location,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -15],
        className: styles.blinking
    });

    const totalDevices = Object.values(regionDevices).reduce((sum, count) => sum + count, 0);

    return (
        <div className={styles.map_wrapper} id="Map" style={{ cursor: 'pointer' }}>
            <div className={'container-md'}>
                <div className={styles.map_section}>
                    <h2 className={styles.map_header}>{t('map.mapHeader')}</h2>
                    <p>{t('map.mapDescription')}</p>
                </div>
            </div>
            <div className={`${styles.mapContainer} container-md`}>
                <MapContainer
                    ref={mapRef}
                    center={[40.15912, 45.002717]}
                    zoom={8}
                    style={{
                        height: "600px",
                        width: "100%",
                        cursor: 'pointer',
                        borderRadius: "20px",
                        boxShadow: "rgb(183 183 194 / 10%) 0px 8px 24px, rgb(221 221 224 / 10%) 0px 16px 56px, rgb(223 223 225 / 10%) 0px 24px 80px"
                    }}
                    scrollWheelZoom={scrollEnabled}
                    zoomAnimation={true}
                    fadeAnimation={true}
                    markerZoomAnimation={true}
                    zoomAnimationThreshold={4}
                >
                    <ToggleScroll />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {zoomLevel < 7 ? (
                        <PolygonWithText
                            coords={armeniaCenter}
                            text={totalDevices}
                            region="Armenia"
                        />
                    ) : zoomLevel < 9 ? (
                        <>
                            {Object.entries(regionDevices).map(([region, count]) => {
                                const regionCoordinates = regionCoordinatesMap[region];
                                if (!regionCoordinates || isNaN(regionCoordinates[0]) || isNaN(regionCoordinates[1])) {
                                    console.warn(`Invalid coordinates for region ${region}:`, regionCoordinates);
                                    return null;
                                }
                                return (
                                    <PolygonWithText
                                        key={region}
                                        coords={regionCoordinates}
                                        text={count}
                                        region={region}
                                    />
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
                                    eventHandlers={{
                                        mouseover: (e) => {
                                            console.log('Device marker mouseover:', device.id);
                                            const markerId = e.target._leaflet_id;
                                            const popup = popupManager.createPopup(
                                                e.target, 
                                                createDevicePopupContent(device, false)
                                            );
                                            setupPopupEvents(popup, markerId);
                                        },
                                        mouseout: (e) => {
                                            console.log('Device marker mouseout:', device.id);
                                            const markerId = e.target._leaflet_id;
                                            popupManager.schedulePopupClose(markerId, 200);
                                        },
                                        click: (e) => {
                                            console.log('Device marker clicked:', device.id);
                                            const markerId = e.target._leaflet_id;
                                            const popup = popupManager.createPopup(
                                                e.target, 
                                                createDevicePopupContent(device, true),
                                                { closeButton: true }
                                            );
                                            setupPopupEvents(popup, markerId);
                                        },
                                    }}
                                />
                            ))}
                            {position && position.latitude !== null && position.longitude !== null && (
                                <Marker
                                    ref={markerRef}
                                    position={[parseFloat(position.latitude), parseFloat(position.longitude)]}
                                    icon={blinkIcon}
                                    eventHandlers={{
                                        click: (e) => {
                                            console.log('blinkIcon marker clicked:', e.latlng);
                                            const markerId = e.target._leaflet_id;
                                            const popup = popupManager.createPopup(
                                                e.target,
                                                createLocationPopupContent(),
                                                { className: styles.locationPopup, closeButton: true }
                                            );
                                            setupPopupEvents(popup, markerId);
                                            e.target._map.panTo(e.latlng);
                                        },
                                        add: () => {
                                            console.log('blinkIcon marker added to map');
                                            if (markerRef.current) {
                                                markerRef.current.bindPopup(createLocationPopupContent(), {
                                                    className: styles.locationPopup,
                                                    closeButton: true
                                                });
                                            }
                                        },
                                        remove: () => {
                                            console.log('blinkIcon marker removed from map');
                                        },
                                    }}
                                />
                            )}
                        </>
                    )}
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
                            className={styles.fullScreenPopup}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                backdropFilter: 'blur(5px)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                                pointerEvents: 'all'
                            }}
                            onWheel={(e) => e.preventDefault()}
                            onClick={() => setShowMessage(false)}
                        >
                            <div className={styles.popupContent}>
                                <span>
                                    {t('map.clickOnMap')}
                                    <img className={styles.clickIcon} src={clickIcon} alt="Click icon" />
                                </span>
                            </div>
                        </div>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapArmenia;