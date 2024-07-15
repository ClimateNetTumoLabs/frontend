import React from 'react';
import styles from './Guide.module.css';

const Guide = () => {
  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.guideTitle}>Build Your Own Climate Monitoring Device</h1>

      <p className={styles.guideSection}>
        Welcome to our Device Guide! Learn how to create a climate monitoring device
        tailored to your needs and interests.
        <p>This guide is for environmental enthusiasts,
        farmers or anyone curious about climate.
        </p>
      </p>

      <h2 className={styles.guideTitle}>What You'll Get</h2>
      <ul className={styles.guideSection}>
        <li>
          <strong>Sensor Recommendations:</strong> Find sensors for measuring:
          <ul>
            <li>Temperature, Humidity, and Pressure</li>
            <li>Air Quality</li>
            <li>UV Index and Light Intensity</li>
            <li>Wind Speed, Direction, and Rainfall</li>
          </ul>
        </li>
        <li><strong>Pricing Information:</strong> Get clear cost details to budget effectively.</li>
        <li><strong>Instructional Videos:</strong> Follow step-by-step tutorials for soldering, sensors gathering and assembling.</li>
        <li><strong>Device Integration:</strong> Connect your device to our platform to collect environmental data.</li>
      </ul>

      <p className={styles.guideSection}>
        By building your own device, you will contribute to environmental awareness and action.
      </p>

      <div className={styles.guideSection}>
        <h2 className={styles.guideTitle}>Benefits of Devices</h2>
        <h3 className={styles.guideSubTitle}>For the Project:</h3>
        <ul>
          <li>Customization: Adapt your device to specific monitoring needs.</li>
          <li>Cost savings: Use affordable components.</li>
        </ul>

        <h3 className={styles.guideSubTitle}>For You:</h3>
        <ul>
          <li>Learn about electronics, programming, and environmental monitoring.</li>
          <li>Collect your data and contribute to climate monitoring.</li>
        </ul>
      </div>
    </div>
  );
}

export default Guide;