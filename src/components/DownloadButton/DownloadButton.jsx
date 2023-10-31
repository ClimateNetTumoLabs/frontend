import React from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import {useState,useEffect} from 'react'

const DownloadButton = (generated_id) => {
    const [devices, setDevices] = useState([generated_id]);

  return (
    <div>
        <CSVLink data={devices}>
            Download File
        </CSVLink>
    </div>
  )
}

export default DownloadButton