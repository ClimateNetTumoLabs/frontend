import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import styles from './Datepickertofrom.module.css'
import axios from "axios";

function ConvertDate(inputDate) {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return  `${year}-${month}-${day}T00:00:00`;
}

const DatePickerToFrom = () => {
    const today = new Date();
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (date < startDate) {
            setStartDate(date);
        }
    };

    const formatDate = (date) => {
        return format(date, 'EEEE, MMMM d, y');
    };


    const handleFilterClick = () => {
        if (startDate && endDate) {
            const path = window.location.pathname;
            const endOfLocation = path.substring(path.lastIndexOf('/') + 1);

            console.log(`http://localhost:8000/device/${endOfLocation}?start_time_str${ConvertDate(startDate)}&end_time_str${ConvertDate(endDate)}`)
                axios.get(`http://localhost:8000/device/${endOfLocation}?start_time_str=${ConvertDate(startDate)}&end_time_str=${ConvertDate(endDate)}`)
                    .then(response => {
                        console.log("Erik")
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
        } else {
            alert("Please input Start and End dates")
        }
    };


    return (
        <div className={styles.filter_section}>
            <div className={`${styles.date_format}`}>
                <label className={styles.filter_label}>Start Date:</label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                />
            </div>
            <div className={`${styles.date_format}`}>
                <label className={styles.filter_label}>End Date:</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={new Date()}
                />
            </div>
            <button className={styles.filter_button} onClick={handleFilterClick}>Filter</button>
        </div>
    );
};

export default DatePickerToFrom;
