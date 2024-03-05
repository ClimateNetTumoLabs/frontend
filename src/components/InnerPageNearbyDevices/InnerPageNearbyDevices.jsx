import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";
import axios from "axios";
import { PositionContext } from "../../context/PositionContext";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance);
}

function receive_nearby_devices(referencePoint, devices, permissionGranted) {
    if (referencePoint) {
        // Calculate distances from the reference point to all other points
        const distances = devices.map(device => {
            return {
                id: device.generated_id,
                name: device.name,
                distance: calculateDistance(
                    referencePoint.latitude,
                    referencePoint.longitude,
                    device.latitude,
                    device.longitude
                )
            };
        });

        console.log("distances", distances);
        // Sort distances in ascending order
        distances.sort((a, b) => (a.distance - b.distance));

        // Display the 3 nearest points
        const nearestPoints = permissionGranted ? distances.slice(0, 3) : distances.slice(1, 3); // Exclude the reference point itself
        console.log("nearestPoints", nearestPoints);
        return nearestPoints
    } else {
        return []
    }

}

function InnerPageNearbyDevices(props) {
    const [devices, setDevices] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { permissionGranted, position } = useContext(PositionContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios
                    .get(`/devices/`)
                    .then(res => {
                        setDevices(res.data);
                    })
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        fetchData()
    }, []);

    let referencePoint;
    if (permissionGranted && position) {
        referencePoint = position;
    } else {
        referencePoint = devices.find(devices => devices.generated_id === props.selected_device_id);
    }
    console.log(JSON.stringify(devices))
    const nearby_list = useMemo(() => receive_nearby_devices(referencePoint, devices), [referencePoint, permissionGranted]);

    return (
        <div className={`${styles.NearDeviceSection}`}>
            <span className={styles.nearTitle}>{permissionGranted ? "Devices Near You" : `Devices near ${referencePoint?.name}`}</span>
            {nearby_list.map(device => (
                
                <Link to={`/device_cl/${device.id}?${device.name}`} key={device.generated_id}>
                    <NearbyDevicesItem
                        key={device.id}
                        id={device.id}
                        name={device.name}
                        distance={device.distance}
                        value={device.value}
                    />
                </Link>
            ))}
        </div>
    )
}
export default InnerPageNearbyDevices;