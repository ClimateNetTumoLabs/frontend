import React from "react";
import styles from './InnerPageNearbyDevices.module.css'
import NearbyDevicesItem from "../NearbyDevicesItem/NearbyDevicesItem";

function InnerPageNearbyDevices() {
    return (
        <div className={`${styles.NearDeviceSection} name`}>
            <span className={styles.nearTitle}>Devices Near You</span>
            <NearbyDevicesItem/>
            <NearbyDevicesItem/>
            <NearbyDevicesItem/>
        </div>
    )
}
export default InnerPageNearbyDevices;