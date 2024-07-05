import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PositionContext } from "../../context/PositionContext";
import styles from "./InnerPage.module.css"
import Loader from "react-js-loader";

import NearbyDevicesSection from "../NearbyDevicesSection/NearbyDevicesSection";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";
import InnerPageGraphSection from "../InnerPageGraphSection/InnerPageGraphSection";

function InnerPage() {
    const { id } = useParams();
    const [lastData, setLastData] = useState(null);
    const [nearbyDevices, setNearbyDevices] = useState([]);
    const [allDevices, setAllDevices] = useState([]);
    const [graphData, setGraphData] = useState([])
    const [nearbyDevicesData, setNearbyDevicesData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('')
    const { permissionGranted, setPosition, setPermissionGranted } = useContext(PositionContext);


    // New state for filter
    const currentDate = new Date();
    const [currentMonth, currentYear] = [currentDate.getMonth(), currentDate.getFullYear()];
    const [timeFilter, setTimeFilter] = useState('hourly');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');


    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const url = getDataUrl(timeFilter);
                // Fetch last data and all devices
                const [lastDataResponse, allDevicesResponse, filteredData] = await Promise.all([
                    axios.get(`/device_inner/${id}/latest/`),
                    axios.get(`/device_inner/list/`),
                    axios.get(url)
                ]);
                setLastData(lastDataResponse.data);
                setAllDevices(allDevicesResponse.data);
                setGraphData(filteredData.data)
                // Find nearby devices
                const obj = allDevicesResponse.data.find(item => item.generated_id == id);

                if (obj) {
                    const nearbyDevs = allDevicesResponse.data.filter(item =>
                        item.parent_name == obj.parent_name && item.generated_id != id
                    );
                    setNearbyDevices(nearbyDevs);
                    const nearbyDataPromises = nearbyDevs.map(device =>
                        axios.get(`/device_inner/${device.id}/nearby/`)
                    );
                    const nearbyDataResponses = await Promise.all(nearbyDataPromises);
                    const nearbyData = {};
                    nearbyDataResponses.forEach((response, index) => {
                        nearbyData[nearbyDevs[index].id] = response.data[0];
                    });
                    setNearbyDevicesData(nearbyData);

                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, [id]);

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return "";
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const getDataUrl = useCallback((filterState) => {
        let start, end;
        switch (filterState) {
            case 'Daily':
                end = formatDate(currentDate);
                start = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
                break;
            case 'Monthly':
                start = formatDate(new Date(currentYear, currentMonth, 1));
                const nextMonthDate = new Date(currentYear, currentMonth + 1, 0);
                end = formatDate(nextMonthDate > currentDate ? currentDate : nextMonthDate);
                break;
            case 'Hourly':
                return `/device_inner/${id}/24hours/`;
            case 'Range':
                start = formatDate(customStartDate);
                end = formatDate(customEndDate);
                break;
            default:
                start = end = formatDate(currentDate);
                break;
        }

        return `/device_inner/${id}/period/?start_time_str=${start}&end_time_str=${end}`;
    });

    return (
        <div className={styles.inner_page}>
            {isLoading ? (
                <div className={styles.loading}><Loader className={styles.loading} type="bubble-scale" size={100} /></div>
            ) : (
                <div className={styles.innerPageContent}>
                    <NearbyDevicesSection selectedRegion={selectedRegion} nearbyDevices={nearbyDevices} nearbyDeviceData={nearbyDevicesData} />
                    <div className={styles.innerPageRightPart}>
                        <InnerPageStaticContent lastData={lastData} />
                        <InnerPageGraphSection weather_data={graphData} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InnerPage;