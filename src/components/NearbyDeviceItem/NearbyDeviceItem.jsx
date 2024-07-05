import React, { useState, useEffect } from 'react';
import styles from './NearbyDeviceItem.module.css';
import distanceIcon from '../../assets/Weather/arrows.webp'
import { Tooltip as ReactTooltip } from "react-tooltip";
import temp from "../../assets/AboutIcons/temperature.webp"
import { useTranslation } from "react-i18next";
import  "../../i18n";

const NearbyDeviceItem = (props) => {
    const { t } = useTranslation();
    const [name, distance, temperature] = useState(props.name, props.distance, props.temperature)

    return (
        <div className={styles.NearbyDevicesItem}>
            <span className={styles.near_device_name} data-tooltip-id={`${props.name + props.id}`}>{name}</span>
            <div className={styles.distance_display}>
                <span>{isNaN(props.distance) ? 'N/A' : `${props.distance} ${t('nearbyDevicesItem.km')}`}</span>
                <img className={styles.distance_icon} src={distanceIcon} alt="Distance Icon" />
            </div>
            <div className={styles.measure}>
                <span>{Math.round(props.temperature)}</span>
                <sup>°C</sup>
                <img className={styles.measurement_icon} src={temp} alt="Temperature" />
            </div>
            {/*<ReactTooltip*/}
            {/*    id={`${props.name + props.id}`}*/}
            {/*    place={tooltipPosition}*/}
            {/*    content={truncatedName !== t(`devices.deviceNames.${props.name}`, props.name) ? (*/}
            {/*        <span dangerouslySetInnerHTML={{ __html: t(`devices.deviceNames.${props.name}`, props.name) }} />*/}
            {/*    ) : null}*/}
            {/*/>*/}
        </div>
    );
};

export default NearbyDeviceItem;