import React from 'react';
import styles from './PointDescription.module.css'

const PointDescription = () => {
    const particles = [
        {
            'PM1' : {
                "point_1" : "These are particles with a diameter of 1 micrometer (µm) or less.",
                "point_2" : "PM1 particles are extremely fine and can penetrate deep into the lungs and even enter the bloodstream.",
                "point_3" : "They are often produced by combustion processes, such as from vehicle exhaust or industrial activities."
            }

        },
        {
            'PM2.5' : {
                "point_1" : "These are particles with a diameter of 2.5 micrometers or less.",
                "point_2" : "PM2.5 particles are also fine, and they can reach the respiratory system's smaller airways and alveoli.",
                "point_3" : "They are a significant component of air pollution and have serious health implications, including respiratory and cardiovascular problems.",
                "point_4" : "World Health Organization (WHO): The annual average standard is 10 µg/m³, and the 24-hour standard is 25 µg/m³. These values represent good air quality."
            }
        },
        {
            'PM10' : {
                "point_1" : "These are particles with a diameter of 10 micrometers or less.",
                "point_2" : "PM10 particles are coarser than PM2.5, meaning they are larger and generally don't penetrate as deeply into the respiratory system.",
                "point_3" : "However, they can still cause health problems, particularly for people with pre-existing respiratory conditions.",
                "pint_4" : "World Health Organization (WHO): The 24-hour standard is 50 µg/m³, which represents good air quality."

            }
        }
    ];

    return (
        <div className={styles.point_description_block}>
            {particles.map((particle, index) => {
                const key = Object.keys(particle)[0];
                const points = particle[key];

                return (
                    <div key={index}>
                        <h3>{key}</h3>
                        <ul>
                            {Object.keys(points).map((point, pointIndex) => (
                                <li key={pointIndex}>{points[point]}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default PointDescription;