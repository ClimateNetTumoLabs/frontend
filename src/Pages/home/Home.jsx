import React from "react";
import styles from "./Home.module.css";
import Banner from "../../components/Banner/banner";
import ScrollableSection from "../../components/Project_description/project_description";
import MapArmenia from "../../components/Map/map";
import Description from "../../components/About_project/Description";

function Home() {
  return (
    <div className={styles.text_white}>
      <Banner />
      <ScrollableSection />
      <MapArmenia />
      {/*<ZoomableImage/>*/}
      <Description />
    </div>
  );
}

export default Home;
