// NavigationContext.js

import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, handleLinkClick }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
