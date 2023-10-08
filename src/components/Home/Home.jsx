import React from "react";
import styles from "./Home.module.css";
import Banner from "../Banner/Banner";
import ScrollableSection from "../../components/Scrollablesection/ScrollableSection";
import MapArmenia from "../Map/Map";
import Description from "../DescriptionProject/Description";

function Home() {
  return (
    <div className={styles.text_white}>
      <Banner />
      <ScrollableSection />
      <MapArmenia />
      <Description />
    </div>
  );
}

export default Home;
