import React, {useState} from "react";
import styles from './InnerPageFilter.module.css'
import {ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import {ReactComponent as Calendar} from '../../assets/FilterIcons/calendar.svg'

function InnerPageFilter(props) {
    const [selectedOption, setSelectedOption] = useState(props.filterState);
    console.log(selectedOption)
    return (
        <div className={`${styles.InnerPageFilterSection}`}>
            <div className={`option ${styles.filterItemBlock} ${selectedOption === 'Hourly' ? styles.active : ''}`}
                 onClick={() => setSelectedOption("Hourly")}>
                <Clock/>
                <span>Hourly</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${selectedOption === 'Daily' ? styles.active : ''}`}
                 onClick={() => setSelectedOption("Daily")}>
                <Calendar/>
                <span>7 Days</span>
            </div>


        </div>
    )
}

export default InnerPageFilter