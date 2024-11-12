import React, { useState, useEffect } from 'react';
import styles from './LinerStatusBar.module.css';
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import  "../../i18n";
import { Link } from 'react-router-dom';

const ColoredProgressBar = (props) => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [, setProgress] = useState(0);
    const [airQuality,setAirQuality] = useState(props.air_quality);
    
    useEffect(()=>{
        setAirQuality(props.air_quality)
    },[props])

    const scale = [
        { max: 12, color: '#00ff00', status: t('linerStatusBar.good'), number: "1" },
        { max: 35, color: '#ffff00', status: t('linerStatusBar.moderate'), number: "2" },
        { max: 55, color: '#ffcc00', status: t('linerStatusBar.unhealthySensitiveGroups'), number: "3" },
        { max: 150, color: '#ff9900', status: t('linerStatusBar.unhealthy'), number: "4" },
        { max: 250, color: '#ff0000', status: t('linerStatusBar.veryUnhealthy'), number: "5" },
        { max: Infinity, color: '#990000', status: t('linerStatusBar.hazardous'), number: "6" }
    ];

    const getColorAndStatusForAirQuality = (value) => {
        for (let i = 0; i < scale.length; i++) {
            if (value <= scale[i].max) {
                return scale[i];
            }
        }
        return scale[scale.length - 1]; // Default to hazardous if above all thresholds
    };

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 1000);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    const { color, status, number } = getColorAndStatusForAirQuality(airQuality);

    const getPointerPosition = (value) => {
        const maxValue = 500; // Maximum value on the scale
        const segments = scale.length;
        const segmentWidth = 100 / segments;

        for (let i = 0; i < scale.length; i++) {
            if (value <= scale[i].max) {
                const segmentStart = i * segmentWidth;
                const segmentPosition = (value - (i > 0 ? scale[i-1].max : 0)) / (scale[i].max - (i > 0 ? scale[i-1].max : 0)) * segmentWidth;
                return Math.min(segmentStart + segmentPosition, 100);
            }
        }
        return 100; // If value exceeds the maximum
    };

    return (
        <div className={styles.progressBarContent}>
            <div>
                <div className={"d-flex flex-row justify-content-between align-items-center"}>
                    <p className={styles.airQualityTitle}>{t('linerStatusBar.airQualityTitle')}</p>
                    <span className={styles.datetime}>{new Date(props.datetime.time).toLocaleString('en-GB', { hour12: false, hour: 'numeric', minute: 'numeric', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/,/g, '')}</span>
                </div>
                <div className={styles.airQualityStatus} >
                    <span className={styles.value} data-tooltip-id="micro_meter_status">{status} ({airQuality} {t('linerStatusBar.myum')})</span>
                    <ReactTooltip
                        id="micro_meter_status"
                        place="top"
                        opacity="1"
                        content={<span dangerouslySetInnerHTML={{ __html: `${t("linerStatusBar.micro")} = 10<sup>-6</sup>` }} />}
                    />
                    <Link to={`/${i18n.language}/about/#pm`} style={{ textDecoration: 'none' }}>
                        <span style={{ background: color }} className={styles.circle}>{number}</span>
                    </Link>
                </div>
            </div>
            <div className={styles.progressBar}>
                {scale.map((segment, index) => (
                    <div
                        key={index}
                        className={styles.segment}
                        style={{
                            left: `${(index / scale.length) * 100}%`,
                            width: `${100 / scale.length}%`,
                            background: segment.color,
                            zIndex: scale.length - index,
                        }}
                    />
                ))}
                <div
                    className={styles.pointer}
                    style={{
                        left: `${getPointerPosition(airQuality)}%`,
                        background: color,
                    }}
                />
            </div>
        </div>
    );
};

export default ColoredProgressBar;