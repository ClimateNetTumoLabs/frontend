import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './InnerPageFilter.module.css'
import { ReactComponent as Clock } from '../../assets/FilterIcons/clock.svg'
import { ReactComponent as Calendar } from '../../assets/FilterIcons/calendar.svg'
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import  "../../i18n";

const StyledDatePicker = styled(DatePicker)`
    color: black;
    background-color: #eae6e2;
    padding: 5px;
    border: 1px solid #ccc;
`;

function InnerPageFilter(props) {
    const { t } = useTranslation();
    const today = new Date();
    const [selectedStartDate, setSelectedStartDate] = useState(props.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(props.endDate);

    const handleApply = () => {
        props.setLeftLoad(true);
        props.filterChange("Range")
        props.setStartDate(selectedStartDate);
        props.setEndDate(selectedEndDate);
        props.setShowDatePicker(false);
    };

    return (
        <div className={`${styles.InnerPageFilterSection}`}>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Hourly' ? styles.active : ''}`}
                onClick={() => {
                    props.filterChange("Hourly");
                    props.setLeftLoad(true);
                }}
            >
                <Clock />
                <span >{t('innerPageFilter.options.hourly')}</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Daily' ? styles.active : ''}`}
                onClick={() => props.filterChange("Daily")}>
                <Calendar />
                <span>{t('innerPageFilter.options.daily')}</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Monthly' ? styles.active : ''}`}
                onClick={() => {
                    props.setLeftLoad(true);
                    props.filterChange("Monthly")
                }}>
                <Calendar />
                <span className={styles.button_popup}>{t('innerPageFilter.options.monthly')}</span>
            </div>
            <div className={`option ${styles.filterItemBlock} ${props.filterState === 'Range' ? styles.active : ''}`}
                onClick={() => props.setShowDatePicker(true)}>
                <Calendar className={styles.state_button} />
                <span className={styles.button_popup}>{t('innerPageFilter.options.range')}</span>
            </div>
            {
                props.showDatePicker &&
                ReactDOM.createPortal(
                    <div
                        className={`${styles.pickerContainer} ${styles.datePickerWrapper}`}>
                        <button className={styles.closeBtn} onClick={() => props.setShowDatePicker(false)}>X</button>
                        <StyledDatePicker
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
                        <StyledDatePicker
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

                        <button className={styles.filter_button} onClick={handleApply}>{t('innerPageFilter.options.filter')}</button>
                    </div>,
                    document.body
                )
            }
        </div>
    )
}

export default InnerPageFilter