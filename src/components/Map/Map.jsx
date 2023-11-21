import React, { useEffect ,useState} from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../assets/icons/map-marker.svg";
import armeniaGeoJSON from "../../armenia.json";
import { Link, Route, Routes } from "react-router-dom";
import InnerPage from "../InnerPage/InnerPage";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import styles from "./Map.module.css";

const MapArmenia = () => {
  const [devices, setDevices] = useState([]);
  const [mapClicked, setMapClicked] = useState(false);

  const handleMapClick = () => {
    setMapClicked(true);
    console.log(mapClicked)
  }

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

  useEffect(() => {
    axios.get(`/devices/`)
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div id="Map" onClick={handleMapClick} >
      <div className={styles.map_section}>
        <h2 className={styles.map_header}>Map</h2>
        <p>The highlighted locations indicate the current active climate devices. Click on a location to access the dataset specific to that device.</p>
      </div>
      <MapContainer
          center={[40.15912, 45.002717]}
          zoom={8}
          style={{ height: "600px", width: "100%" }}
          scrollWheelZoom={mapClicked}

           // Set up click event handler
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {devices.map(device => (
          <Marker
            key={device.id}
            position={[parseFloat(device.latitude), parseFloat(device.longitude)]}
            icon={customIcon}
          >
            <Popup>
              <Link to={`/device_cl/${device.generated_id}`}>{device.parent_name}</Link>
            </Popup>
          </Marker>
        ))}
        <GeoJSON data={armeniaGeoJSON} style={geoJSONStyle} />
        <FullscreenControl forceSeparateButton={true} position={"topright"} />
        <Routes>
          <Route path="/device/:id" element={<InnerPage />} />
        </Routes>
      </MapContainer>
    </div>
  );
};

export default MapArmenia;