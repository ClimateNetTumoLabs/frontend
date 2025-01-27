import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";
import axios from "axios";
import { PositionContext } from "../../context/PositionContext";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import "../../i18n";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance);
}

function receive_nearby_devices(referencePoint, devices, permissionGranted, i18n) {
    if (referencePoint) {
        const distances = devices.map(device => {
            return {
                id: device.generated_id,
                name: device[i18n.language === 'hy' ? 'name_hy' : 'name_en'],
                distance: calculateDistance(
                    referencePoint.latitude,
                    referencePoint.longitude,
                    device.latitude,
                    device.longitude
                )
            };
        });

        distances.sort((a, b) => (a.distance - b.distance));

        const nearestPoints = permissionGranted ? distances.slice(0, 3) : distances.slice(0, 3);
        return nearestPoints
    } else {
        return []
    }
}

function InnerPageNearbyDevices(props) {
    const { t, i18n } = useTranslation();
    const [devices, setDevices] = useState([]);
    const { permissionGranted, position } = useContext(PositionContext);
    const [deviceDataArrays, setDeviceDataArrays] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios
                    .get(`/device_inner/list/`)
                    .then(res => {
                        setDevices(res.data);
                    })
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchData();
    }, []);

    let referencePoint;
    if (permissionGranted && position) {
        referencePoint = position;
    } else {
        referencePoint = devices.find(devices => devices.generated_id === props.selected_device_id);
    }

    const nearby_list = useMemo(() => {
        if (referencePoint && devices.length > 0) {
            const filteredDevices = devices.filter(device => device.generated_id !== props.selected_device_id);
            const calculatedNearbyList = receive_nearby_devices(referencePoint, filteredDevices, permissionGranted, i18n);
            return calculatedNearbyList;
        }
        return [];
    }, [referencePoint, permissionGranted, devices, props.selected_device_id])


    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const promises = nearby_list.map(device => {
                    return axios.get(`/device_inner/${device.id}/nearby/`);
                });
                const responses = await Promise.all(promises);

                setDeviceDataArrays(responses.map(response => response.data));
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };
        fetchItemData();
    }, [nearby_list]);

    if (props.leftLoad) {
        return <div className={styles.loader}>
            <Loader type="spinner"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={70} />
        </div>
    }

    return (
        <div className={`${styles.NearDeviceSection}`}>
            {nearby_list.length > 0 && (
                <span className={styles.nearTitle}>
                    {permissionGranted
                        ? t('innerPageNearbyDevices.titles.devicesNearYou')
                        : `${t('innerPageNearbyDevices.titles.devicesNear')} ${referencePoint ? referencePoint[i18n.language === 'hy' ? 'name_hy' : 'name_en'] : ''}`
                    }
                </span>
        )}
            {nearby_list.map((device, i) => (
                <Link
                    to={`/${i18n.language}/device/${device.id}/?${device.name}`}
                    key={device.id}
                    className={styles.link}
                    onClick={() => {
                        props.setLeftLoad(true);
                        props.filterChange("Hourly")
                    }}
                >
                    <NearbyDevicesItem
                        id={device.id}
                        name={device.name}
                        distance={device.distance}
                        value={device.value}
                        temperature={deviceDataArrays.length > 0 ? deviceDataArrays[i][0] : null}
                    />
                </Link>
            ))}
        </div>
    );
}

export default InnerPageNearbyDevices;
