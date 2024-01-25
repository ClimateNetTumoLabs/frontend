import React from "react";
import styles from './InnerPageFilter.module.css'
import {ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import {ReactComponent as Calendar} from '../../assets/FilterIcons/calendar.svg'

function InnerPageFilter(props) {
    return (
        <div className={`${styles.InnerPageFilterSection}`}>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Hourly' ? styles.active : ''}`}
                 onClick={() => props.filterChange("Hourly")}>
                <Clock/>
                <span>Hourly</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Daily' ? styles.active : ''}`}
                 onClick={() => props.filterChange("Daily")}>
                <Calendar/>
                <span>7 Days</span>
            </div>
        </div>
    )
}

export default InnerPageFilter