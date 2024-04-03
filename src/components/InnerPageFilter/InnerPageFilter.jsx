import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InnerPageFilter.module.css'
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import styled from 'styled-components';


const StyledStartDatePicker = styled(DatePicker)`
color: black;
background-color: white;
padding: 5px;
border: 1px solid #ccc;
margin-bottom: 10px;
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
padding: 5px;
border: 1px solid #ccc;
margin-bottom: 10px;

@media (max-width: 767px) {
    position: fixed;
    top: calc(50% + 50px);
    left: 50%;
    transform: translateX(-50%);
}
`;

function InnerPageFilter(props) {
    const today = new Date();
    const [selectedStartDate, setSelectedStartDate] = useState(props.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(props.endDate);
  
    const handleApply = () => {
        props.filterChange("Range")
        props.setStartDate(selectedStartDate);
        props.setEndDate(selectedEndDate);
        console.log("Error is >>>> ", props.error)
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
                <span>Current Month</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Range' ? styles.active : ''}`}
                onClick={() => props.setShowDatePicker(true)}>
                <Calendar />
                <span>Range</span>
            </div>
            {true &&
                (
                    <div className={`${styles.pickerContainer} ${styles.datePickerWrapper}`}>
                        <StyledStartDatePicker
                            selected={selectedStartDate}
                            onChange={date => setSelectedStartDate(date)}
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
                            maxDate={today} 
                        />
                        <StyledEndDatePicker
                            selected={selectedEndDate}
                            onChange={date => setSelectedEndDate(date)}
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
                            minDate={selectedStartDate}
                            maxDate={today}
                        />

                        <button className={styles.filter_button} onClick={handleApply}>Filter</button>
                        <div className={styles.btnWrapper} style={{ display: props.showDatePicker ? 'block' : 'none' }}>
                            <div>
                                <button className={styles.closeBtn} onClick={() => props.setShowDatePicker(false)}>X</button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default InnerPageFilter