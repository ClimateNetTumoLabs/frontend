import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, useMap, Marker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../assets/Icons/map-marker.svg";
import location from "../../assets/Icons/circle.jpeg";
import armeniaGeoJSON from "../../armenia.json";
import { Route, Routes } from "react-router-dom";
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

const PolygonWithText = ({ coords, text, region, zoomLevel }) => {
    const map = useMap();
    const markerRef = useRef(null);
    const center = coords && !isNaN(coords[0]) && !isNaN(coords[1]) ? L.latLng(coords[0], coords[1]) : null;

    useEffect(() => {
        if (!center) return;
        const marker = circleWithText2(center, text, 20, 1);
        markerRef.current = marker;

        marker.on('click', () => {
            const targetZoom = zoomLevel < 7 ? 8 : 10;
            map.setView(center, targetZoom);
        });

        marker.addTo(map);
        return () => {
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
                markerRef.current = null;
            }
        };
    }, [center, text, map, region, coords, zoomLevel]);

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
                    const targetZoom = zoomLevel < 7 ? 8 : 10;
                    map.setView(center, targetZoom);
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

const isDataOutdated = (deviceTime) => {
    if (!deviceTime || deviceTime === 'N/A') return false;

    try {
        const deviceDate = new Date(deviceTime);
        if (isNaN(deviceDate.getTime())) return false;

        const now = new Date();
        const minutes = now.getMinutes();
        const minutesToLastInterval = minutes % 15;
        const lastIntervalTime = new Date(now);
        lastIntervalTime.setMinutes(minutes - minutesToLastInterval);
        lastIntervalTime.setSeconds(0);
        lastIntervalTime.setMilliseconds(0);
        return deviceDate < lastIntervalTime;
    } catch (error) {
        return false;
    }
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
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [isMapVisible, setIsMapVisible] = useState(true);

    const regionCoordinatesMap = {
        "Aragatsotn": [40.5233, 44.4784],
        "Ararat": [39.97532, 44.75555],
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
        // eslint-disable-next-line
    }, []);

    const handleZoom = (map) => {
        setZoomLevel(map.getZoom());
        popupManager.cleanup();
    };

    const ToggleScroll = () => {
        const map = useMapEvents({
            zoom: () => {
                handleZoom(map);
            },
            dblclick: (e) => {
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
            map.dragging.disable();
        } else {
            map.scrollWheelZoom[scrollEnabled ? "enable" : "disable"]();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            map.dragging.enable();
        }

        return null;
    };

    const InfoControl = L.Control.extend({
        onAdd: function (map) {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

            container.style.backgroundColor = 'white';
            container.style.backgroundSize = '30px 30px';
            container.style.width = '34px';
            container.style.height = '34px';
            container.style.cursor = 'pointer';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.border = '2px solid rgba(0,0,0,0.2)';
            container.style.borderRadius = '2px';

            const icon = L.DomUtil.create('i', 'fa fa-info', container);
            icon.style.fontSize = '14px';
            icon.style.color = 'black';
            icon.style.fontWeight = 'bold';
            icon.style.pointerEvents = 'none'; 

            container.onmouseenter = function () {
                this.style.backgroundColor = '#f4f4f4';
            };

            container.onmouseleave = function () {
                this.style.backgroundColor = 'white';
            };

            container.onclick = this.options.onClick;

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            return container;
        },

    });

    const InfoButton = ({ onClick, hidden }) => {
        const map = useMap();
        useEffect(() => {
            if (hidden) return;

            const infoControl = new InfoControl({
                position: 'topright',
                onClick: onClick
            });

            map.addControl(infoControl);
            map.invalidateSize();

            return () => {
                map.removeControl(infoControl);
                map.invalidateSize();
            };
        }, [map, onClick, hidden]);

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
        const isLoading = isFetchingLatest[device.generated_id];
        const imageSrc = `https://images-in-website.s3.us-east-1.amazonaws.com/Map/${device.generated_id}.webp`;
        const fallbackImageSrc = 'https://images-in-website.s3.us-east-1.amazonaws.com/Weather/device.svg';
        const isOutdated = isDataOutdated(device.time);
        return `
        <div class="${styles.hoverCard}">
            <div class="${styles.imageZoomContainer}">
                <img 
                    src="${imageSrc}" 
                    alt="${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}" 
                    class="${styles.deviceImage}"
                    onerror="this.src='${fallbackImageSrc}'"
                />
                <div class="${styles.zoomLens}"></div>
                <div class="${styles.zoomResult}"></div>
            </div>
            <h3> ${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']} </h3>
                <div class="${styles.compareIconContainer}">
                    <div 
                        class="${styles.compareIconVS}" 
                        onclick="window.dispatchEvent(new CustomEvent('compareDevice', { detail: { id: '${device.generated_id}' } }))"
                    >
                        VS
                    </div>
                    <span class="${styles.compareTooltip}">${t('map.compareTooltip')}</span>
                </div>
            ${isLoading ? `
                <p>Loading...</p>
            ` : `
                <div class="${styles.cardContent}">
                    <p>${t('map.mapHumidity')}: <span class="${styles.cardData}">${device.humidity != null ? device.humidity : 'N/A'}%</span></p>
                    <p>${t('map.mapTemperature')}: <span class="${styles.cardData}">${device.temperature != null ? device.temperature : 'N/A'}°C</span></p>
                    <p class="${styles.cardTime}">${isOutdated ? "⛔ " : "✅ "}<i>${device.time != null ? device.time : 'N/A'}</i></p>
                </div>
            `}
            <a href="/${i18n.language}/device/${device.generated_id}/?${device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}">${t('map.clickDetails')}</a>
        </div>
    `;
    };

    const setupPopupEvents = (popup, markerId) => {
        const popupElement = popup.getElement();
        if (!popupElement) return;

        popupElement.addEventListener('mouseenter', () => {
            popupManager.cancelPopupClose(markerId);
        });
        popupElement.addEventListener('mouseleave', () => {
            popupManager.schedulePopupClose(markerId, 200);
        });

        const image = popupElement.querySelector(`.${styles.deviceImage}`);
        const lens = popupElement.querySelector(`.${styles.zoomLens}`);
        const result = popupElement.querySelector(`.${styles.zoomResult}`);

        if (image && lens && result) {
            const initializeZoom = () => {
                const imgRect = image.getBoundingClientRect();
                const lensSize = 60;
                const zoomFactor = 3;
                const resultSize = 200;

                result.style.backgroundImage = `url(${image.src})`;
                result.style.backgroundSize = `${imgRect.width * zoomFactor}px ${imgRect.height * zoomFactor}px`;

                const moveLens = (e) => {
                    e.preventDefault();
                    const pos = getCursorPos(e, image);
                    let x = pos.x - lensSize / 2;
                    let y = pos.y - lensSize / 2;

                    x = Math.max(0, Math.min(x, imgRect.width - lensSize));
                    y = Math.max(0, Math.min(y, imgRect.height - lensSize));
                    lens.style.left = `${x}px`;
                    lens.style.top = `${y}px`;

                    const bgX = Math.min(x * zoomFactor, (imgRect.width * zoomFactor) - resultSize);
                    const bgY = Math.min(y * zoomFactor, (imgRect.height * zoomFactor) - resultSize);
                    result.style.backgroundPosition = `-${bgX}px -${bgY}px`;
                };

                const getCursorPos = (e, img) => {
                    const rect = img.getBoundingClientRect();
                    let clientX, clientY;
                    if (e.type.startsWith('touch')) {
                        const touch = e.touches[0] || e.changedTouches[0];
                        clientX = touch.clientX;
                        clientY = touch.clientY;
                    } else {
                        clientX = e.clientX;
                        clientY = e.clientY;
                    }
                    return {
                        x: clientX - rect.left,
                        y: clientY - rect.top
                    };
                };

                image.addEventListener('mousemove', moveLens);
                image.addEventListener('mouseenter', () => {
                    lens.style.display = 'block';
                    result.style.display = 'block';
                });
                image.addEventListener('mouseleave', () => {
                    lens.style.display = 'none';
                    result.style.display = 'none';
                });
                image.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    lens.style.display = 'block';
                    result.style.display = 'block';
                    moveLens(e);
                });
                image.addEventListener('touchmove', moveLens);
                image.addEventListener('touchend', () => {
                    lens.style.display = 'none';
                    result.style.display = 'none';
                });

                popup.on('remove', () => {
                    image.removeEventListener('mousemove', moveLens);
                    image.removeEventListener('mouseenter', () => { });
                    image.removeEventListener('mouseleave', () => { });
                    image.removeEventListener('touchstart', () => { });
                    image.removeEventListener('touchmove', moveLens);
                    image.removeEventListener('touchend', () => { });
                });
            };

            if (image.complete) {
                initializeZoom();
            } else {
                image.addEventListener('load', initializeZoom);
            }
        }
    };

    useEffect(() => {
        const fetchDeviceList = async () => {
            try {
                const deviceListResponse = await axios.get(`/device_inner/list/`);
                const deviceList = deviceListResponse.data.map(device => ({
                    ...device,
                    temperature: null,
                    humidity: null
                }));
                setDevices(deviceList);
                setIsFetchingLatest(deviceList.reduce((acc, device) => ({
                    ...acc,
                    [device.generated_id]: false
                }), {}));
                await fetchLatestData(deviceList);
            } catch (error) {
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
                        const latestResponse = await axios.get(`/device_inner/${device.generated_id}/latest/`);
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
                            return device;
                        }
                    } catch (error) {
                        return device;
                    }
                });

                const devicesWithLatest = await Promise.all(devicePromises);
                setDevices(devicesWithLatest);
                setIsFetchingLatest(prev => ({
                    ...prev,
                    ...deviceList.reduce((acc, device) => ({
                        ...acc,
                        [device.generated_id]: false
                    }), {})
                }));
            } catch (error) {
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

            const timeoutId = setTimeout(() => {
                if (devices.length > 0) {
                    fetchLatestData(devices);
                } else {
                    fetchDeviceList();
                }
                const intervalId = setInterval(() => {
                    if (devices.length > 0) {
                        fetchLatestData(devices);
                    } else {
                        fetchDeviceList();
                    }
                }, 15 * 60 * 1000);
                intervalRef.current = intervalId;
            }, delayMilliseconds > 0 ? delayMilliseconds : 0);

            return timeoutId;
        };

        fetchDeviceList();
        const timeoutId = scheduleNextFetch();

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            if (showMessage) {
                e.preventDefault();
            }
        };

        const popup = document.querySelector(`.${styles.fullScreenPopup}`);
        if (popup) {
            popup.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (popup) {
                popup.removeEventListener('wheel', handleWheel, { passive: false });
            }
        };
    }, [showMessage, styles.fullScreenPopup]);

    useEffect(() => {
        const handleScroll = () => {
            const mapElement = document.getElementById('Map');
            if (mapElement) {
                const rect = mapElement.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                const mapVisibleRatio = visibleHeight / viewportHeight;
                setIsMapVisible(mapVisibleRatio > 0.5);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleCompareDevice = (event) => {
            const { id } = event.detail;
            const device = devices.find(d => d.generated_id === id);
            if (device && !selectedDevices.find(d => d.generated_id === id)) {
                setSelectedDevices(prev => [...prev, device]);
                popupManager.cleanup();
            }
        };

        window.addEventListener('compareDevice', handleCompareDevice);
        return () => window.removeEventListener('compareDevice', handleCompareDevice);
    }, [devices, selectedDevices, popupManager]);

    const handleRemoveDevice = (deviceId) => {
        setSelectedDevices(prev => prev.filter(device => device.generated_id !== deviceId));
    };

    useEffect(() => {
        const compareBar = document.querySelector(`.${styles.compareBar}`);
        const deviceList = document.querySelector(`.${styles.deviceList}`);
        let hideTimeout = null;
        let isListVisible = false;

        if (!compareBar || !deviceList) return;

        const showList = () => {
            clearTimeout(hideTimeout);
            deviceList.style.display = 'block';
            isListVisible = true;
        };

        const hideList = () => {
            clearTimeout(hideTimeout);
            deviceList.style.display = 'none';
            isListVisible = false;
        };

        const hideListWithDelay = () => {
            hideTimeout = setTimeout(() => {
                deviceList.style.display = 'none';
                isListVisible = false;
            }, 300);
        };

        const handleClick = () => {
            if (isListVisible) {
                hideList();
            } else {
                showList();
            }
        };

        compareBar.addEventListener('mouseenter', showList);
        compareBar.addEventListener('mouseleave', hideListWithDelay);
        deviceList.addEventListener('mouseenter', showList);
        deviceList.addEventListener('mouseleave', hideListWithDelay);
        compareBar.addEventListener('click', handleClick);

        return () => {
            compareBar.removeEventListener('mouseenter', showList);
            compareBar.removeEventListener('mouseleave', hideListWithDelay);
            deviceList.removeEventListener('mouseenter', showList);
            deviceList.removeEventListener('mouseleave', hideListWithDelay);
            compareBar.removeEventListener('click', handleClick);
            clearTimeout(hideTimeout);
        };
    }, [selectedDevices]);

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
        shadowUrl: null,
        shadowSize: [60, 60],
        shadowAnchor: [30, 30]
    });

    const blinkIcon = new L.Icon({
        iconUrl: location,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -15],
        className: styles.blinking,
        shadowUrl: null,
        shadowSize: [60, 60],
        shadowAnchor: [30, 30]
    });

    const totalDevices = Object.values(regionDevices).reduce((sum, count) => sum + count, 0);

    const navigate = useNavigate();

    const handleCompare = () => {
        if (selectedDevices.length >= 2) {
            const ids = selectedDevices.map(d => d.generated_id).join(',');
            navigate(`/${i18n.language}/api?tab=compare&devices=${ids}`);
        }
    };

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
                            zoomLevel={zoomLevel}
                        />
                    ) : zoomLevel < 9 ? (
                        <>
                            {Object.entries(regionDevices).map(([region, count]) => {
                                const regionCoordinates = regionCoordinatesMap[region];
                                if (!regionCoordinates || isNaN(regionCoordinates[0]) || isNaN(regionCoordinates[1])) {
                                    return null;
                                }
                                return (
                                    <PolygonWithText
                                        key={region}
                                        coords={regionCoordinates}
                                        text={count}
                                        region={region}
                                        zoomLevel={zoomLevel}
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
                                            const markerId = e.target._leaflet_id;
                                            const popup = popupManager.createPopup(
                                                e.target,
                                                createDevicePopupContent(device, false)
                                            );
                                            setupPopupEvents(popup, markerId);
                                        },
                                        mouseout: (e) => {
                                            const markerId = e.target._leaflet_id;
                                            popupManager.schedulePopupClose(markerId, 200);
                                        },
                                        click: (e) => {
                                            const markerId = e.target._leaflet_id;
                                            const popup = popupManager.createPopup(
                                                e.target,
                                                createDevicePopupContent(device, false),
                                            );
                                            setupPopupEvents(popup, markerId);
                                        },
                                    }}
                                />
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
                    <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
                    <FullscreenControl forceSeparateButton={true} position={"topright"} className="custom-fullscreen-control" />
                    <ResetViewControl
                        className={styles.my_resetView}
                        title="Reset view"
                        position={"topright"}
                        icon="url(https://images-in-website.s3.us-east-1.amazonaws.com/Icons/reset.png)"
                    />
                    <InfoButton
                        onClick={() => setShowMessage(true)}
                        hidden={showMessage}
                    />
                    <Routes>
                        <Route path="/device/:id" element={<InnerPage />} />
                    </Routes>
                    {showMessage && (
                        <div
                            className={styles.fullScreenPopup}
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
            {selectedDevices.length > 0 && (
                <div className={`${styles.compareBar} ${isMapVisible ? '' : styles.collapsed}`}>
                    {isMapVisible ? (
                        <>
                            <div
                                className={`${styles.deviceCountBadge} ${selectedDevices.length < 2 ? styles.disabled : ''}`}
                            >
                                {selectedDevices.length}
                            </div>
                            <button
                                className={styles.compareButton}
                                onClick={handleCompare}
                                disabled={selectedDevices.length < 2}
                            >
                                {t('map.compareButton')}
                            </button>
                            <div className={styles.deviceList}>
                                {selectedDevices.map(device => (
                                    <div key={device.generated_id} className={styles.deviceListItem}>
                                        <span>{device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</span>
                                        <button
                                            className={styles.removeDeviceButton}
                                            onClick={() => handleRemoveDevice(device.generated_id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.deviceCountBadge}>
                                {selectedDevices.length}
                            </div>
                            <button className={styles.versues} onClick={handleCompare} disabled={selectedDevices.length < 2}>VS</button>
                            <div className={styles.deviceList}>
                                {selectedDevices.map(device => (
                                    <div key={device.generated_id} className={styles.deviceListItem}>
                                        <span>{device[i18n.language === 'hy' ? 'name_hy' : 'name_en']}</span>
                                        <button
                                            className={styles.removeDeviceButton}
                                            onClick={() => handleRemoveDevice(device.generated_id)}>
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MapArmenia;

