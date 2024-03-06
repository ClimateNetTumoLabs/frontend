import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InnerPageFilter.module.css'
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
    color: #555;
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

function InnerPageFilter(props) {
    return (
        <div className={`${styles.InnerPageFilterSection}`}>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Hourly' ? styles.active : ''}`}
                onClick={() => props.filterChange("Hourly")}>
                <Clock />
                <span>Hourly</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Daily' ? styles.active : ''}`}
                onClick={() => props.filterChange("Daily")}>
                <Calendar />
                <span>7 Days</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Monthly' ? styles.active : ''}`}
                onClick={() => props.filterChange("Monthly")}>
                <Calendar />
                <span>This Month</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Range' ? styles.active : ''}`}
                onClick={() => props.filterChange("Range")}>
                <Calendar />
                <div>
                    <span>Range</span>
                    <div>
                        <StyledDatePicker
                            selected={props.startDate}
                            onChange={date => props.setStartDate(date)}
                        />
                        <StyledDatePicker
                            selected={props.endDate}
                            onChange={date => props.setEndDate(date)}
                        />
                    </div>
                    {props.error}
                </div>
            </div>
        </div>
    )
}

export default InnerPageFilter