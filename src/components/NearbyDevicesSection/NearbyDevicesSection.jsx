import React, {useEffect, useState} from "react";
import styles from './NearbyDevicesSection.module.css'
import NearbyDeviceItem from "../NearbyDeviceItem/NearbyDeviceItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n";

function NearbyDevicesSection({selectedRegion, nearbyDevices, nearbyDeviceData }) {
    const { t, i18n } = useTranslation();
    console.log("NearbyDevices:", nearbyDevices)
    console.log("nearbyDeviceData", nearbyDeviceData)

    return (
        <div className={styles.NearbyDevicesSection}>
            <span>{selectedRegion}</span>
            {nearbyDevices.map((device, i) => (
                <Link to={`/${i18n.language}/device/${device.generated_id}`} key={device.generated_id} className={styles.link}>
                    <NearbyDeviceItem
                        name={device.name}
                        distance={device.distance}
                        temperature = {nearbyDeviceData[device.id]}
                    />
                </Link>
            ))}

        </div>
    );
}

export default NearbyDevicesSection