import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../assets/icons/map-marker.svg";
import armeniaGeoJSON from "../../test.json";
import { Link, Route, Routes } from "react-router-dom";
import InnerPage from "../inner_page/InnerPage";

const MapArmenia = () => {
  const geoJSONStyle = {
    fillColor: "green",
    fillOpacity: "0.1",
    color: "black",
    weight: 3,
  };

  const customIcon = new L.Icon({
    iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });

  const center = [40.19185102418464, 44.47937321283996];

  return (
    <div id={"Map"}>
      <MapContainer
        center={[40.15912, 45.002717]}
        zoom={8}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={customIcon}>
          <Popup>
            <Link to="/device/1">Yerevan</Link>
          </Popup>
        </Marker>
        <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
        <Routes>
          <Route path="/device/:id" element={<InnerPage />} />
        </Routes>
      </MapContainer>
    </div>
  );
};

export default MapArmenia;
