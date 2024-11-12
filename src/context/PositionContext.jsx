import React, { createContext, useState, useEffect } from 'react';

export const PositionContext = createContext();

export const PositionProvider = ({ children }) => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setPermissionGranted(true);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <PositionContext.Provider value={{ position, permissionGranted, setPermissionGranted, setPosition }}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionProvider;