import React, { useState, useEffect } from 'react';
import styles from './NearbyDevicesItem.module.css';
// import distanceIcon from '../../assets/Weather/arrows.webp'
import { Tooltip as ReactTooltip } from "react-tooltip";
// import temp from "../../assets/AboutIcons/temperature.png"
import { useTranslation } from "react-i18next";
import "../../i18n";

const NearbyDeviceItem = (props) => {
    const { i18n } = useTranslation();
    const [truncatedName, setTruncatedName] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState(window.innerWidth <= 768 ? 'top' : 'bottom');

    const calculateNewPosition = () => {
        return window.innerWidth <= 768 ? 'top' : 'bottom';
    };

    useEffect(() => {
        const handleResize = () => {
            setTooltipPosition(calculateNewPosition());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (props.name) {
            if (props.name.length > 12) {
                setTruncatedName(`${props.name.slice(0, 12)}...`);
            } else {
                setTruncatedName(props.name);
            }
        } else {
            setTruncatedName('Unknown Device');
        }
    }, [props.name]);

    if (!props.temperature || !props.name) {
        return null;
    }

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
                <span>{Math.round(props.temperature)}</span>
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