import React from 'react'
import styles from './statsCard.module.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

export const StatsCard = ({type, measurement, value, timestamp, isMobile}) => {
    const {t} = useTranslation();

    const measurement_unit = {
        [t("innerPageDynamicContent.temperature")] : ["°C", "#FFFA75"],
        [t("innerPageDynamicContent.humidity")]: ["%", "#76B6EA"],
        "PM 2.5": ["µg/m³","#E1D916"],
        [t("innerPageDynamicContent.pressure")]: [t("linerStatusBar.hPa") ,"#FFFF04"],
        [t("innerPageDynamicContent.light_intensity")]: [t("linerStatusBar.lux"), "#01FFFF"],
        [t("innerPageDynamicContent.light_uv")]: ["", "#01FF00"]
    };

    const formatTime = (timestamp) =>
    {
        if (!timestamp)
            return "N/A"
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <div data-tooltip-id={`detail-${type}-${measurement}`} className={`card p-2 ${styles.statsCard}`} style={isMobile ? { minWidth: '140px' } : {minWidth: '180px'}}>
            <div className={isMobile ? 'd-flex flex-row justify-content-between text-center' : 'text-center'} >
                <div className={`${styles.label}`} style={{marginRight : '0px'}}>
                    {type === 'min' ? t('min_max.min') : t('min_max.max')} {!isMobile && measurement}
                </div>
                <div style={{color:measurement_unit[measurement][1]}} className={styles.value}>{value} {measurement_unit[measurement][0]}</div>
                <ReactTooltip id={`detail-${type}-${measurement}`}  place="top"
                            content={<span dangerouslySetInnerHTML={{ __html: `${formatTime(timestamp)}` }} />}/>
                
            </div>
        </div>
    )
}

export default StatsCard