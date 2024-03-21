import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InnerPageFilter.module.css'
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import styled from 'styled-components';


const StyledStartDatePicker = styled(DatePicker)`
color: black;
background-color: white;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
@media (max-width: 767px) {
    position: fixed;
    top: calc(50% - 30px);
    left: 50%;
    transform: translateX(-50%);
}
`;

const StyledEndDatePicker = styled(DatePicker)`
color: black;
background-color: white;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
@media (max-width: 767px) {
    position: fixed;
    top: calc(50% + 50px);
    left: 50%;
    transform: translateX(-50%);
}
`;

function InnerPageFilter(props) {

    const handleClose = () => {
        props.handleCloseDatePicker();
        props.setError("")
    };

    const handleApply = () => {
        props.filterChange("Range");
        if(!props.error)
            props.setShowDatePicker(false);
    };

    const handleRange = () => {
        props.setShowDatePicker(true);
    };

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
                onClick={handleRange}>
                <Calendar />
                <span>Range</span>
            </div>
            {props.showDatePicker &&
                (
                    <div className={`${styles.pickerContainer} ${styles.datePickerWrapper}`}>

                        <StyledStartDatePicker
                            selected={props.startDate}
                            onChange={date => props.setStartDate(date)}
                            popperClassName="propper"
                            popperPlacement="top"
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 5],
                                    },
                                },
                                {
                                    name: "preventOverflow",
                                    options: {
                                        rootBoundary: "viewport",
                                        tether: false,
                                        altAxis: true,
                                    },
                                },
                            ]}

                        />
                        <StyledEndDatePicker
                            selected={props.endDate}
                            onChange={date => props.setEndDate(date)}
                            popperClassName="propper"
                            popperPlacement="top-end"
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [100, -70],
                                    },
                                },
                                {
                                    name: "preventOverflow",
                                    options: {
                                        rootBoundary: "viewport",
                                        tether: false,
                                        altAxis: true,
                                    },
                                },
                            ]}
                        />

                        <div className={styles.btnWrapper} style={{ display: props.showDatePicker ? 'block' : 'none' }}>
                            <div>
                                <button className={styles.closeBtn} onClick={handleClose}>X</button>
                            </div>
                            {props.error && <div style={{ width: '100%', color: "red", paddingTop: "20px" }}>{props.error}</div>}
                            <div>
                                <button className={styles.applyBtn} onClick={handleApply}>Apply</button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default InnerPageFilter