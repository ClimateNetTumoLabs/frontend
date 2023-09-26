import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import armeniaGeoJSON from './data_map.json'


const MapArmenia = () => {
    const geoJSONStyle = {
        fillColor: 'green',
        fillOpacity: '0.1' ,
        color: 'black', // Border color
        weight: 3,    // Border thickness (make it bold)
    };

    return (
        <MapContainer
            center={[40.159120, 45.002717]} // Center of Armenia
            zoom={8}
            style={{ height: '600px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle}/>
        </MapContainer>
    );
};

export default MapArmenia;