import React from "react";
import styles from "./Home.module.css";
import Banner from "../Banner/Banner";
import ScrollableSection from "../ScrollableSection/ScrollableSection";
import MapArmenia from "../Map/Map";
import Description from "../DescriptionProject/Description";
import ContactForm from "../Contact/Contact";

function Home() {
  return (
    <div className={styles.text_white}>
      <Banner />
      <ScrollableSection />
      <Description />
      <MapArmenia />
      <ContactForm/>
    </div>
  );
}

export default Home;
