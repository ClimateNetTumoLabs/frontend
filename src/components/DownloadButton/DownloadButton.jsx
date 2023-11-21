import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import Button from "react-bootstrap/Button";
import styles from "./DownloadButton.module.css";

function ConvertDate(inputDate) {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const DownloadButton = ({ startDate, endDate ,weather_data}) => {
    const [weather_data_download, ChangeData] = useState(weather_data)
    useEffect(() => {
        const path = window.location.pathname;
        const endOfLocation = path.substring(path.lastIndexOf("/") + 1);
        axios
            .get(
                `/device/${endOfLocation}?start_time_str=${ConvertDate(
                    startDate
                )}&end_time_str=${ConvertDate(endDate)}`
            )
            .then((response) => {
                ChangeData(response.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [startDate, endDate]);

    return (
            <CSVLink data={weather_data_download} className={`${styles.download_button_block}`}>
                <Button className={styles.download_button} variant="outline-primary">Download Full Data</Button>
            </CSVLink>
    );
};

export default DownloadButton;
