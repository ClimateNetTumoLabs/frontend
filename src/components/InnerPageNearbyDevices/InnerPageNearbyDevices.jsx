import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";
import axios from "axios";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import "../../i18n";

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance);
}

function InnerPageNearbyDevices({ device, ...props }) {
    const { t, i18n } = useTranslation();
    const [devicesWithData, setDevicesWithData] = useState([]);
    const [loading, setLoading] = useState(true);
    const parent_name = device.parent_name;

    // Reset the state when the device props change
    useEffect(() => {
        // Clear previous data immediately when device changes
        setDevicesWithData([]);
        setLoading(true);
    }, [device.generated_id, device.parent_name]);

    // Data fetching effect
    useEffect(() => {
        let isMounted = true;

        const fetchAllData = async () => {
            try {
                // First API call to get the list of devices
                const devicesResponse = await axios.get('/device_inner/list/');

                if (!isMounted) return;

                const allDevices = devicesResponse.data;

                // Apply both filters at once
                let filteredDevices = allDevices
                    .filter(d => d.parent_name === parent_name)
                    .filter(d => d.generated_id != props.selected_device_id)


                if (filteredDevices.length === 0) {
                    setDevicesWithData([]);
                    setLoading(false);
                    return;
                }

                // Calculate the distance for each device before fetching nearby data
                const devicesWithDistance = filteredDevices.map(nearbyDevice => {
                    let calculatedDistance = null;
                    if (device.latitude && device.longitude && nearbyDevice.latitude && nearbyDevice.longitude) {
                        calculatedDistance = calculateDistance(
                            device.latitude, device.longitude,
                            nearbyDevice.latitude, nearbyDevice.longitude
                        );
                    }

                    return { ...nearbyDevice, distance: calculatedDistance };
                });

                // Create an array of promises for all nearby data requests
                const nearbyDataPromises = devicesWithDistance.map(nearbyDevice =>
                    axios.get(`/device_inner/${nearbyDevice.generated_id}/nearby/`)
                        .then(response => ({
                            device: nearbyDevice,
                            nearbyData: response.data,
                            distance: nearbyDevice.distance
                        }))
                        .catch(error => {
                            console.error(`Error fetching data for device ${nearbyDevice.generated_id}:`, error);
                            return {
                                device: nearbyDevice,
                                nearbyData: null,
                                distance: nearbyDevice.distance
                            };
                        })
                );

                // Wait for all nearby data requests to complete
                const results = await Promise.all(nearbyDataPromises);

                if (!isMounted) return;

                // Set the new data
                setDevicesWithData(results);

            } catch (error) {
                console.error('Error fetching data:', error);
                if (isMounted) {
                    setDevicesWithData([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAllData();

        return () => {
            isMounted = false;
        };
    }, [parent_name, props.selected_device_id, device.generated_id]);

    if (loading) {
        return (
            <div className={styles.loader}>
                <Loader type="spinner" bgColor={"#FFFFFF"} color={"#FFFFFF"} size={70} />
            </div>
        );
    }

    const currentRegionName = device[i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name'];

    return (
        <div className={styles.NearDeviceSection}>
            {devicesWithData.length > 0 && (
                <span className={styles.nearTitle}>
                    {t('innerPageNearbyDevices.titles.devicesNear')} <strong>{currentRegionName}</strong>{t('innerPageNearbyDevices.titles.devicesNearArm')}
                </span>
            )}
            {devicesWithData.map(({ device: nearbyDevice, nearbyData, distance }) => (
                <Link
                    to={`/${i18n.language}/device/${nearbyDevice.generated_id}/?${nearbyDevice[i18n.language === 'hy' ? 'name_hy' : 'name_en']}`}
                    key={nearbyDevice.generated_id}
                    className={styles.link}
                    onClick={() => {
                        props.setLeftLoad(true);
                        props.filterChange("Hourly");
                    }}
                >
                    <NearbyDevicesItem
                        id={nearbyDevice.generated_id}
                        name={nearbyDevice[i18n.language === 'hy' ? 'name_hy' : 'name_en']}
                        temperature={nearbyData?.[0] || null}
                        distance={distance || nearbyData?.distance || null}
                    />
                </Link>
            ))}
        </div>
    );
}

export default InnerPageNearbyDevices;