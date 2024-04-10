import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InnerPageFilter.module.css'
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const StyledStartDatePicker = styled(DatePicker)`
position: relative;
color: black;
background-color: white;
padding: 5px;
padding: 5px;
border: 1px solid #ccc;
margin-bottom: 10px;
margin-bottom: 10px;
@media (max-width: 767px) {
    top: calc(50% - 30px);
    left: 50%;
    transform: translateX(-50%);
    margin-top: 240px;
}
`;

const StyledEndDatePicker = styled(DatePicker)`
position: relative;
color: black;
background-color: white;
padding: 5px;
padding: 5px;
border: 1px solid #ccc;
margin-bottom: 10px;
@media (max-width: 767px) {
    top: calc(50% + 50px);
    left: 50%;
    transform: translateX(-50%);
}
`;

const StyledSpan = styled.span`
position: absolute;
top: -100%;
left: 50%;
transform: translateX(-50%);
opacity: 1;
transition: opacity 0.3s ease;
`;

const StyledCalendarWrapper = styled.div`
position: relative;
&:hover ${StyledSpan} {
  opacity: 1;
}
`;

function InnerPageFilter(props) {
    const today = new Date();
    const [selectedStartDate, setSelectedStartDate] = useState(props.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(props.endDate);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    const handleApply = () => {
        props.setLeftLoad(true);
        props.filterChange("Range")
        props.setStartDate(selectedStartDate);
        props.setEndDate(selectedEndDate);
        props.setShowDatePicker(false);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 767);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className={`${styles.InnerPageFilterSection}`}>
            {
                (isMobile) &&
                <>
                    <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Hourly' ? styles.active : ''}`}
                        onClick={() => {
                            props.filterChange("Hourly");
                            props.setLeftLoad(true);
                        }}
                    >
                        <StyledCalendarWrapper>
                            <Clock className={styles.state_button} />
                            <StyledSpan className={styles.button_popup}>Hourly</StyledSpan>
                        </StyledCalendarWrapper>
                    </div>
                    <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Daily' ? styles.active : ''}`}
                        onClick={() => props.filterChange("Daily")}>
                        <StyledCalendarWrapper>
                            <Calendar className={styles.state_button} />
                            <StyledSpan>7 Days</StyledSpan>
                        </StyledCalendarWrapper>
                    </div>
                    <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Monthly' ? styles.active : ''}`}
                        onClick={() => {
                            props.setLeftLoad(true);
                            props.filterChange("Monthly")
                        }}>
                        <StyledCalendarWrapper>
                            <Calendar className={styles.state_button} />
                            <StyledSpan className={styles.button_popup}>Current Month</StyledSpan>
                        </StyledCalendarWrapper>
                    </div>
                    <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Range' ? styles.active : ''}`}
                        onClick={() => props.setShowDatePicker(true)}>
                        <StyledCalendarWrapper>
                            <Calendar className={styles.state_button} />
                            <StyledSpan className={styles.button_popup}>Range</StyledSpan>
                        </StyledCalendarWrapper>
                    </div>
                </>
            }
            {(isMobile) ?
                (
                    props.showDatePicker &&
                    ReactDOM.createPortal(
                        <div
                            className={`${styles.pickerContainer} ${styles.datePickerWrapper}`}>
                            <button className={styles.closeBtn} onClick={() => props.setShowDatePicker(false)}>X</button>
                            <StyledStartDatePicker
                                selected={selectedStartDate}
                                onChange={date => setSelectedStartDate(date)}
                                popperClassName="propper"
                                popperPlacement="top"
                                popperModifiers={[
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, 0],
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
                                popperPlacement="top"
                                popperModifiers={[
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, 0],
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
                        </div>,
                        document.body
                    )
                ) : (
                    <div
                        className={`${styles.pickerContainer} ${styles.datePickerWrapper}`}>
                        <StyledStartDatePicker
                            selected={selectedStartDate}
                            onChange={date => setSelectedStartDate(date)}
                            popperClassName="propper"
                            popperPlacement="top"
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 0],
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
                            popperPlacement="top"
                            popperModifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 0],
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

                        <div className={styles.btnWrapper}>
                            <button className={styles.filter_button} onClick={handleApply}>Filter</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default InnerPageFilter