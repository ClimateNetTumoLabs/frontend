// ColoredProgressBar.js
import React, { useState, useEffect } from 'react';
import styles from './LinerStatusBar.module.css';
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import  "../../i18n";

const ColoredProgressBar = (props) => {
    const { t } = useTranslation();
    const [, setProgress] = useState(0);
    const [airQuality] = useState(props.air_quality); // Adjusted range to 0-250

    const getColorAndStatusForAirQuality = (value) => {
        // Adjusted color scale and status for the new range
        const colorScale = [
            { color: '#00ff00', status: t('linerStatusBar.good'), number : "1" },
            { color: '#ffff00', status: t('linerStatusBar.moderate'),  number : "2" },
            { color: '#ffcc00', status: t('linerStatusBar.unhealthySensitiveGroups'),  number : "3" },
            { color: '#ff9900', status: t('linerStatusBar.unhealthy'), number : "4" },
            { color: '#ff0000', status: t('linerStatusBar.veryUnhealthy'),  number : "5" },
            { color: '#990000', status: t('linerStatusBar.hazardous'), number : "6" }
        ];

        // Map the air quality value to an index in the color scale
        const index = Math.min(Math.floor((value / 250) * colorScale.length), colorScale.length - 1);
        return colorScale[index] || '#00ff00';
    };

    useEffect(() => {
        // Simulate progress update (you can replace this with your actual logic)
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 1000);

        return () => {
            clearInterval(progressInterval);
        };
    },);

    const { color, status, number } = getColorAndStatusForAirQuality(airQuality);

    return (
        <div className={styles.progressBarContent}>
            <div>
                <div className={"d-flex flex-row justify-content-between align-items-center"}>
                    <p className={styles.airQualityTitle}>{t('linerStatusBar.airQualityTitle')}</p>
                    <span className={styles.datetime}>{new Date(props.datetime.time).toLocaleString('en-GB', { hour12: false, hour: 'numeric', minute: 'numeric', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/,/g, '')}</span>
                </div>
                <div  className={styles.airQualityStatus} >
                    <span className={styles.value} data-tooltip-id="micro_meter_status">{status} ({airQuality} {t('linerStatusBar.myum')})</span>
                    <ReactTooltip
                            id="micro_meter_status"
                            place="top"
                            opacity="1"
                            content={<span dangerouslySetInnerHTML={{ __html: `${t("linerStatusBar.micro")} = 10<sup>-6</sup>` }} />}
                        />
                    <span style={{ background : color }} className={styles.circle}>{number}</span>
                </div>

            </div>
            <div className={styles.progressBar}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className={styles.segment}
                        style={{
                            left: `${(index / 6) * 100}%`,
                            width: `${100 / 6}%`,
                            background: getColorAndStatusForAirQuality(index * 50).color,
                            zIndex: 6 - index,
                        }}
                    />
                ))}
                <div
                    className={styles.pointer}
                    style={{
                        left: `${(airQuality / 250) * 100}%`, // Adjusted range
                        background: color,
                    }}
                />
            </div>

        </div>
    );
};

export default ColoredProgressBar;
