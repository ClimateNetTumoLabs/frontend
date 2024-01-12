import React from "react";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";

function InnerPageNearbyDevices() {
    return (
        <div className={`${styles.NearDeviceSection}`}>
            <span className={styles.nearTitle}>Devices Near You</span>
            <NearbyDevicesItem name={"V. Sargsyan"} value = {"22"} distance={"16 km"}/>
            <NearbyDevicesItem name={"Sevan"} distance={"108 km"} value = {"-16"}/>
            <NearbyDevicesItem name={"Panik"} distance={"150 km"} value = {"-4"}/>
        </div>
    )
}
export default InnerPageNearbyDevices;