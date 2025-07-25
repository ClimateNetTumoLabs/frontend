import React from 'react'
import StatsCard from '../statsCard/statsCard'
import { useTranslation } from "react-i18next";


const Stats = ({ Tab, statsData, isMobile }) => {
    const {t} = useTranslation();

    const displayNames = {
        'temperature': t("innerPageDynamicContent.temperature"),
        'humidity': t("innerPageDynamicContent.humidity"),
        'pm2_5': "PM 2.5",
        'pressure': t("innerPageDynamicContent.pressure"),
        'uv': t("innerPageDynamicContent.light_uv"),
        'lux': t("innerPageDynamicContent.light_intensity")
    };

    const tabMeasurements = {
        'tem_and_hum': ['temperature', 'humidity'],
        'pm': ['pm2_5'],
        'pressure': ['pressure'],
        'light': ['uv', 'lux']
    };

    const measurements = tabMeasurements[Tab] || [];
    
    return (
        <div className={`d-flex gap-3 flex-wrap mb-3 ${isMobile && 'justify-content-center'}`}>
            {measurements.map((measurement) => (
                ['min', 'max'].map((type) => (
                    <StatsCard
                    isMobile={isMobile}
                    key={`${measurement}-${type}`}
                    type={type}
                    measurement={displayNames[measurement] || measurement}
                    timestamp={type === 'min' ? statsData?.data?.[measurement]?.min_timestamp  : statsData?.data?.[measurement]?.max_timestamp}
                    value={
                        type === 'min'
                        ? statsData?.data?.[measurement]?.min ?? '-'
                        : statsData?.data?.[measurement]?.max ?? '-'
                    }
                    />
                ))
            ))}
        </div>
    )
}

export default Stats
