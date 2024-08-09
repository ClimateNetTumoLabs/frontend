import React from "react";
import styles from "./Home.module.css";
import Banner from "../Banner/Banner";
import ScrollableSection from "../ScrollableSection/ScrollableSection";
import MapArmenia from "../Map/Map";
import Description from "../DescriptionProject/Description";
import ContactForm from "../Contact/Contact";
import { useTranslation } from "react-i18next";
import  "../../i18n";

function Home() {
    const { t } = useTranslation();

    return (
        <div className={styles.text_white}>
            <Banner />
            <ScrollableSection />
            <Description />
            <MapArmenia />
            <ContactForm name = {t('contact.title')} subject_state = {true}/>
        </div>
    );
}

export default Home;
