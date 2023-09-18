import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from '../../../../assets/icons/marker-icon-2x.png'; // Replace with the actual path to your icon

import armeniaGeoJSON from './test.json'
import {Link, Route, Routes} from "react-router-dom";
import InnerPage from "../../../InnerPage/inner_page";


const MapArmenia = () => {
    const geoJSONStyle = {
        fillColor: 'green',
        fillOpacity: '0.1' ,
        color: 'black', // Border color
        weight: 3,    // Border thickness (make it bold)
    };

    const customIcon = new L.Icon({
        iconUrl,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    });

    const center = [40.3486, 45.0247]; // Initial map center coordinates

    return (
        <MapContainer
            center={[40.159120, 45.002717]} // Center of Armenia
            zoom={8}
            style={{ height: '600px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <ZoomControl position="bottomright" />
            <Marker position={center} icon={customIcon}>
                <Popup><Link to="/device/1">Details Page</Link></Popup>
            </Marker>
            <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle}/>
            <Routes>
                <Route path="/device/:id" element={<InnerPage />} />
            </Routes>
        </MapContainer>
    );
};

export default MapArmenia;