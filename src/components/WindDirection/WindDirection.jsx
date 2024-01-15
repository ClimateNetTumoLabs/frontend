import React, { useState, useEffect } from 'react';
import styles from './WindDirection.module.css';
import arrow from "../../assets/Icons/wind_arrow.png"

const WindDirection = ({ direction }) => {
    console.log(direction)
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        // Calculate rotation based on the provided wind direction
        const getRotation = () => {
            switch (direction) {
                case 'N':
                    return 0;
                case 'NE':
                    return 45;
                case 'E':
                    return 90;
                case 'SE':
                    return 135;
                case 'S':
                    return 180;
                case 'SW':
                    return 225;
                case 'W':
                    return 270;
                case 'NW':
                    return 315;
                default:
                    return 0;
            }
        };

        // Set initial rotation and update on direction change
        setRotation(getRotation());
    }, [direction]);

    return (
        <div className={styles.wind_container}>
            <img src={arrow} alt="Dir. Arrow" style={{ transform: `rotate(${rotation}deg)` }}/>
        </div>
    );
};

export default WindDirection;
