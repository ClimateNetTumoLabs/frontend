import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceComponent = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/device/2/');
        console.log(response.data); // Add this line to check the response data
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };
  
    fetchData();
  }, []);
  console.log(devices);
  return (
    <div>
      <h1>List of Devices</h1>
      <ul>
        {devices.map(device => (
          <li key={device.id}>{device.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceComponent;

