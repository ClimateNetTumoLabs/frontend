// ScrollToMap.js

import React from "react";
import { useNavigation } from "./NavigationContext";

const ScrollToMap = () => {
  const { handleLinkClick } = useNavigation();

  const goToMap = () => {
    handleLinkClick("Map");

    const targetElement = document.getElementById("Map");

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button onClick={goToMap}>Go to Map</button>
  );
}

export default ScrollToMap;
