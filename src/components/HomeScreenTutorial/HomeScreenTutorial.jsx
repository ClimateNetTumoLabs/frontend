import React, { useState, useEffect } from "react";
import styles from "./HomeScreenTutorial.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";

const QRSection = () => {
    const { t } = useTranslation()

  return (
  <div className={styles.telegramBot}>
    <div className={styles.qrContainer}>
      <a href="https://t.me/ClimateNetBot" target="_blank" rel="noreferrer">
        <img
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/botQR.png"
          alt="Telegram Bot QR Code"
          loading="lazy"
        />
      </a>
      <p>{t('homeScreenTutorial.bot.title')}</p>
    </div>
  </div>
  )
};

const MobileTutorials = ({ selectedPlatform, togglePlatform }) => (
  <div className={styles.mobileTutorials}>
    <div className={styles.mobilePlatformButtons}>
      <button
        className={`${styles.platformButton} ${selectedPlatform === "ios" ? styles.active : ""}`}
        onClick={() => togglePlatform("ios")}
      >
        iOS <FontAwesomeIcon icon={faApple} />
      </button>
      <button
        className={`${styles.platformButton} ${selectedPlatform === "android" ? styles.active : ""}`}
        onClick={() => togglePlatform("android")}
      >
        Android <FontAwesomeIcon icon={faAndroid} />
      </button>
    </div>
    {selectedPlatform === "ios" && (
      <div className={styles.tutorialItem}>
        <video
          className={styles.iosVideo}
          autoPlay
          muted
          loop
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/ios-video.mp4"
          alt="iOS Home Screen Tutorial"
        />
      </div>
    )}
    {selectedPlatform === "android" && (
      <div className={styles.tutorialItem}>
        <video
          className={styles.androidVideo}
          autoPlay
          muted
          loop
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/android-video.mp4"
          alt="Android Home Screen Tutorial"
        />
      </div>
    )}
    <QRSection />
  </div>
);

const DesktopTutorials = () => {

    const { t } = useTranslation()
    return (
  <div className={styles.desktopTutorials}>
    <div className={styles.tutorialContainer}>
      <div className={styles.tutorialColumn}>
        <video
          className={styles.iosVideo}
          autoPlay
          muted
          loop
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/ios-video.mp4"
          alt="iOS Home Screen Tutorial"
        />
        <p>iOS <FontAwesomeIcon icon={faApple} /></p>
      </div>
      <div className={styles.tutorialDescription}>
        <div className={styles.iosSteps}>
          <h3>{t('homeScreenTutorial.ios.title')}</h3>
          <ol>
              <li>{t('homeScreenTutorial.ios.point1')}</li>
              <li>{t('homeScreenTutorial.ios.point2')}</li>
              <li>{t('homeScreenTutorial.ios.point3')}</li>
              <li>{t('homeScreenTutorial.ios.point4')}</li>
          </ol>
        </div>
        <div className={styles.androidSteps}>
          <h3>{t('homeScreenTutorial.android.title')}</h3>
          <ol>
              <li>{t('homeScreenTutorial.android.point1')}</li>
              <li>{t('homeScreenTutorial.android.point2')}</li>
              <li>{t('homeScreenTutorial.android.point3')}</li>
              <li>{t('homeScreenTutorial.android.point4')}</li>
          </ol>
        </div>
        <QRSection />
      </div>
      <div className={styles.tutorialColumn}>
        <video
          className={styles.androidVideo}
          autoPlay
          muted
          loop
          src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/android-video.mp4"
          alt="Android Home Screen Tutorial"
        />
        <p>Android <FontAwesomeIcon icon={faAndroid} /></p>
      </div>
    </div>
  </div>
  )
};

const HomeScreenTutorial = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const togglePlatform = (platform) => {
    setSelectedPlatform(selectedPlatform === platform ? null : platform);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const detectPlatform = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        setSelectedPlatform("android");
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        setSelectedPlatform("ios");
      }
    };

    window.addEventListener("resize", handleResize);
    detectPlatform();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.homeScreenTools}>
      <h2>{t("homeScreenTutorial.title")}</h2>
      {isMobile ? (
        <MobileTutorials
          selectedPlatform={selectedPlatform}
          togglePlatform={togglePlatform}
        />
      ) : (
        <DesktopTutorials />
      )}
    </div>
  );
};

export default HomeScreenTutorial;
