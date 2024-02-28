import React, {useEffect, useState} from "react";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";
import axios from "axios";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return Math.round(distance);
}

function receive_nearby_devices(referencePoint, devices) {
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

        // Sort distances in ascending order
        distances.sort((a, b) => a.distance - b.distance);

        // Display the 3 nearest points
        const nearestPoints = distances.slice(1, 3); // Exclude the reference point itself
        return nearestPoints
    } else {
        return []
    }

}


function InnerPageNearbyDevices(props) {
    const [devices, setDevices] = useState([]);
    const [isLoading, setLoading] = useState(true);

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

    // Get the reference point
    const referencePoint = devices.find(devices => devices.generated_id === props.selected_device_id);
    const nearby_list = receive_nearby_devices(referencePoint, devices)

    return (
        <div className={`${styles.NearDeviceSection}`}>
            <span className={styles.nearTitle}>Devices Near You</span>
            {nearby_list.map(device => (
                <NearbyDevicesItem
                    key={device.id}
                    id={device.id}
                    name={device.name}
                    distance={device.distance}
                    value={device.value}
                />
            ))}
        </div>
    )
}
export default InnerPageNearbyDevices;