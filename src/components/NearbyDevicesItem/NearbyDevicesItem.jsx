import React from "react";
import styles from './NearbyDevicesItem.module.css'
import sun from '../../assets/Weather/sun.png'
import distance from '../../assets/Weather/arrows.png'

function NearbyDevicesItem(props) {
    return (
        <div className={`${styles.NearbyDevicesItem}`}>
            <span className={styles.near_device_name}>{props.name}</span>
            <div className={styles.distance_display}>
                <span>{props.distance}</span>
                <img className={styles.distance_icon} src={distance} alt={"sun"}/>
            </div>
            <img className={styles.weather_icon} src={sun} alt={"sun"}/>
            <span className={styles.temperature_measure}>{props.value}<sup>°C</sup></span>
        </div>
    )
}
export default NearbyDevicesItem;