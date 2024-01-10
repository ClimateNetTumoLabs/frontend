import React from "react";
import styles from './NearbyDevicesItem.module.css'
import sun from '../../assets/weather/sun.png'
import distance from '../../assets/weather/arrows.png'

function NearbyDevicesItem() {
    return (
        <div className={`${styles.NearbyDevicesItem}`}>
            <span>V. Sargsyan </span>
            <div className={styles.distance_display}>
                <span>5 km</span>
                <img className={styles.distance_icon} src={distance} alt={"sun"}/>
            </div>
            <img className={styles.weather_icon} src={sun} alt={"sun"}/>
        </div>
    )
}
export default NearbyDevicesItem;