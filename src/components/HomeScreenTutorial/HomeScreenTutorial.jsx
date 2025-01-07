import React, { useState } from "react";
import styles from "./HomeScreenTutorial.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faAndroid } from '@fortawesome/free-brands-svg-icons';

const HomeScreenTutorial = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const togglePlatform = (platform) => {
    if (selectedPlatform === platform) {
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(platform);
    }
  };

  return (
      <div className={styles.homeScreenTools}>
        <h2>Add to Home Screen</h2>

        {/* Mobile Buttons - Only visible on mobile */}
        <div className={styles.mobilePlatformButtons}>
          <button
            className={`${styles.platformButton} ${selectedPlatform === 'ios' ? styles.active : ''}`}
            onClick={() => togglePlatform('ios')}
          >
            iOS <FontAwesomeIcon icon={faApple} />
          </button>
          <button
            className={`${styles.platformButton} ${selectedPlatform === 'android' ? styles.active : ''}`}
            onClick={() => togglePlatform('android')}
          >
            Android <FontAwesomeIcon icon={faAndroid} />
          </button>
        </div>

        {/* Mobile Tutorial View */}
        <div id="iosMobile" className={styles.mobileTutorials}>
          {selectedPlatform === 'ios' && (
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
          {selectedPlatform === 'android' && (
            <div id="androidMobile" className={styles.tutorialItem}>
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
          <div className={styles.telegramBot}>
            <div className={styles.qrContainer}>
              <img src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/botQR.png" alt="Telegram Bot QR Code" />
              <p>Scan this QR code to connect with our Telegram Bot and get real-time updates!</p>
            </div>
          </div>
        </div>

        {/* Desktop Tutorial View */}
        <div className={styles.desktopTutorials}>
          <div className={styles.tutorialContainer}>
            <div className={styles.tutorialColumn}>
              <video
                  id="iosDesktop"
                  className={styles.iosVideo}
                  autoPlay
                  muted
                  loop
                  src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/ios-video.mp4"
                  alt="iOS Home Screen Tutorial" />
              <p>iOS <FontAwesomeIcon icon={faApple} /></p>
            </div>

            <div className={styles.tutorialDescription}>
              <div className={styles.iosSteps}>
                <h3>iOS Installation Steps:</h3>
                <p>1. Open Safari and navigate to our website</p>
                <p>2. Tap the Share button at the bottom of the screen</p>
                <p>3. Scroll down and tap "Add to Home Screen"</p>
                <p>4. Customize the name if desired and tap "Add"</p>
              </div>
              <div className={styles.androidSteps}>
                <h3>Android Installation Steps:</h3>
                <p>1. Open Chrome and visit our website</p>
                <p>2. Tap the three-dot menu in the top right</p>
                <p>3. Select "Add to Home screen"</p>
                <p>4. Confirm by tapping "Add"</p>
              </div>
              <div className={styles.telegramBot}>
                <div className={styles.qrContainer}>
                  <img src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/botQR.png" alt="Telegram Bot QR Code" />
                  <p>Scan this QR code to connect with our Telegram Bot and get real-time updates!</p>
                </div>
              </div>
            </div>

            <div className={styles.tutorialColumn}>
              <video
                  id="androidDesktop"
                  className={styles.androidVideo}
                  autoPlay
                  muted
                  loop
                  src="https://images-in-website.s3.us-east-1.amazonaws.com/Tutorials/android-video.mp4"
                  alt="Android Home Screen Tutorial" />
              <p>Android <FontAwesomeIcon icon={faAndroid} /></p>
            </div>
          </div>
        </div>

      </div>
  );
};

export default HomeScreenTutorial;
