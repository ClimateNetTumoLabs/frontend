import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import Button from "react-bootstrap/Button";
import style from "./DownloadButton.module.css";

const DownloadButton = ({ startDate, endDate }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const endOfLocation = path.substring(path.lastIndexOf("/") + 1);
    axios
      .get(
        `http://localhost:8000/device/${endOfLocation}?start_time_str=${startDate}&end_time_str=${endDate}`
      )
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [startDate, endDate]);

  return (
    <div className={style.download_button}>
      <Button variant="outline-primary">
        <CSVLink data={devices}>Download File</CSVLink>
      </Button>
    </div>
  );
};

export default DownloadButton;
