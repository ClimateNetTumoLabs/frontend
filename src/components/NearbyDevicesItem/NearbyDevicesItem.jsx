import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './NearbyDevicesItem.module.css'; // Import your CSS module
import distanceIcon from '../../assets/Weather/arrows.png'
import {Tooltip as ReactTooltip} from "react-tooltip";
import temp from "../../assets/AboutIcons/temperature.png"

const NearbyDeviceItem = (props) => {
    const [data, setData] = useState(null);
    const [truncatedName, setTruncatedName] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState(window.innerWidth <= 768 ? 'top' : 'bottom');
 
    const calculateNewPosition = () => {
        const newPosition = { top: window.innerWidth <= 768 ? 'top' : 'bottom' };
        return newPosition;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                .get(`/device/${props.id}`)
                .then(res => {
                        setData(res.data[res.data.length - 1])
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                props.setLeftLoad(false);
            }
        };
        fetchData();
    }, [props.id]);

    useEffect(() => {
        const handleResize = () => {
            setTooltipPosition(calculateNewPosition().top);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (props.name.length > 12) {
            setTruncatedName(`${props.name.slice(0, 12)}...`);
        } else {
            setTruncatedName(props.name);
        }
    }, [props.name]);
    
    // Return null if data is not loaded yet
    if (!data) {
        return null;
    }
    // if (data) {
    //     console.log(data)
    // }
    return (
        <div className={`${styles.NearbyDevicesItem}`}>
            <span className={styles.near_device_name} data-tooltip-id={`${props.name + props.id}`} 
            >{truncatedName}</span>
            <div className={styles.distance_display}>
                <span>{props.distance} km</span>
                <img className={styles.distance_icon} src={distanceIcon} alt={"Distance Icon"}/>
            </div>
            <div className={styles.measure}>
                <span>{Math.round(data.temperature)}</span>
                <sup>°C</sup>
                <img className={styles.measurement_icon} src={temp} alt={"Temperature"}/>
            </div>
            <ReactTooltip
                id={`${props.name + props.id}`}
                place={tooltipPosition}
                content={truncatedName !== props.name ? <span dangerouslySetInnerHTML={{ __html: props.name }} /> : null}
            />
        </div>
    );
};

export default NearbyDeviceItem;
