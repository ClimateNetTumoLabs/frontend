import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";
import axios from "axios";
import { PositionContext } from "../../context/PositionContext";
import Loader from "react-js-loader";

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

        // Sort distances in ascending order
        distances.sort((a, b) => (a.distance - b.distance));

        // Display the 3 nearest points
        const nearestPoints = permissionGranted ? distances.slice(0, 3) : distances.slice(0, 3); // Exclude the reference point itself
        return nearestPoints
    } else {
        return []
    }
}

function InnerPageNearbyDevices(props) {
    const [devices, setDevices] = useState([]);
    const { permissionGranted, position } = useContext(PositionContext);
    const [deviceDataArrays, setDeviceDataArrays] = useState([]);

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

        fetchData();
    }, [props, props.id]);

    let referencePoint;
    if (permissionGranted && position) {
        referencePoint = position;
    } else {
        referencePoint = devices.find(devices => devices.generated_id === props.selected_device_id);
    }

    const nearby_list = useMemo(() => {
        if (referencePoint && devices.length > 0) {
            const filteredDevices = devices.filter(device => device.generated_id !== props.selected_device_id);
            const calculatedNearbyList = receive_nearby_devices(referencePoint, filteredDevices, permissionGranted);
            return calculatedNearbyList;
        }
        return [];
    }, [referencePoint, permissionGranted, devices, props.selected_device_id])


    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const promises = nearby_list.map(device => {
                    return axios.get(`/device/${device.id}?near_device=1`);
                });
                const responses = await Promise.all(promises);
                
                setDeviceDataArrays(responses.map(response => response.data));
                console.log(deviceDataArrays)
            } catch (error) {
                console.error('Error fetching item data:', error);
            } 
        };
        fetchItemData();
    }, [nearby_list]);

    if (props.leftLoad) {
        return <div className={styles.loader}>
            <Loader type="spinner-circle"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={100} />
        </div>
    }

    return (
        <div className={`${styles.NearDeviceSection}`}>
            {nearby_list.length > 0 && <span className={styles.nearTitle}>{permissionGranted ? "Devices Near You" : `Devices near ${referencePoint?.name}`}</span>}
            {nearby_list.map((device, i )=> (
                <Link to={`/device_cl/${device.id}?${device.name}`} key={device.id} className={styles.link}
                    onClick={() => {
                        props.setLeftLoad(true);
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
    )
}
export default InnerPageNearbyDevices;
