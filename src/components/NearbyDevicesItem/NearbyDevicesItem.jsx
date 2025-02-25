import React, { useState, useEffect } from 'react';
import styles from './NearbyDevicesItem.module.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import "../../i18n";

const NearbyDeviceItem = (props) => {
    const { i18n } = useTranslation();
    const [truncatedName, setTruncatedName] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState(window.innerWidth <= 768 ? 'top' : 'bottom');

    useEffect(() => {
        const handleResize = () => {
            setTooltipPosition(window.innerWidth <= 768 ? 'top' : 'bottom');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (props.name) {
            setTruncatedName(props.name.length > 12 ? `${props.name.slice(0, 12)}...` : props.name);
        } else {
            setTruncatedName('Unknown Device');
        }
    }, [props.name]);

    return (
        <div className={styles.NearbyDevicesItem}>
            <span className={styles.near_device_name} data-tooltip-id={`${props.name + props.id}`}>
                {truncatedName}
            </span>
            <div className={styles.distance_display}>
                <span>{isNaN(props.distance) ? 'N/A' : `${props.distance} ${i18n.language === 'hy' ? 'կմ' : 'km'}`}</span>
                <img className={styles.distance_icon} src={"https://images-in-website.s3.us-east-1.amazonaws.com/Weather/arrows.webp"} alt="Distance Icon" />
            </div>
            <div className={styles.measure}>
                <span>{props.temperature !== null ? Math.round(props.temperature) : 'N/A'}</span>
                <sup>°C</sup>
                <img className={styles.measurement_icon} src={"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/temperature.png"} alt="Temperature" />
            </div>
            <ReactTooltip
                id={`${props.name + props.id}`}
                place={tooltipPosition}
                content={truncatedName !== props.name ? props.name : null}
            />
        </div>
    );
};

export default NearbyDeviceItem;
