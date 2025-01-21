import React from "react";
import styles from "./Home.module.css";
import Banner from "../Banner/Banner";
import MapArmenia from "../Map/Map";
import Description from "../DescriptionProject/Description";
import ContactForm from "../Contact/Contact";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import  "../../i18n";
import HomeScreenTutorial from "../HomeScreenTutorial/HomeScreenTutorial";

function Home() {
    const { t } = useTranslation();

    return (
        <div className={styles.text_white}>
            <Helmet>
                <title>ClimateNet | Climate Data & Environmental Updates</title>
                <meta name="description" content="ClimateNet offers real-time environmental monitoring solutions to help communities and organizations track key climate data like temperature, humidity, and air quality for a sustainable future." />
            </Helmet>
            <Banner />
            <HomeScreenTutorial />
            <Description />
            <MapArmenia />
            <ContactForm name = {t('contact.title1')} subject_state = {true}/>
        </div>
    );
}

export default Home;
