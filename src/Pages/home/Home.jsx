import React from "react";
import styles from "./Home.module.css";
import Banner from "../../components/Banner/banner";
import ScrollableSection from "../../components/scrollablesection/ScrollableSection";
import MapArmenia from "../../components/map/Map";
import Description from "../../components/description_project/Description";

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
