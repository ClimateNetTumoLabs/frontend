import React, { useState } from 'react';
import styles from './GuidePage.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Tools from '../Tools/Tools.jsx';
import Materials from '../Materials/Materials.jsx';
import ProgressCircle from '../ProgressCircle/ProgressCircle.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faVideo, faTerminal, faList } from '@fortawesome/free-solid-svg-icons';

const Guide = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab); // Toggle visibility
  };

  return (
    <div className={styles.app}>
      <div className={styles.title}>
        <h1>
          Welcome to Our Guide of making <br />your own <b>ClimateNet</b> Device
        </h1>
      </div>

      <div className={styles.tabs}>
        <div
          className={styles.tab}
          onClick={() => handleTabClick('materials')}
        >
          <FontAwesomeIcon
            icon={faList}
            className={`${styles.icon} ${activeTab === 'materials' ? 'fa-fade' : ''}`}
          />
          <p className={styles.tabFont}>Materials</p>

        </div>
        <div
          className={styles.tab}
          onClick={() => handleTabClick('tools')}
        >
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className={`${styles.icon} ${activeTab === 'tools' ? 'fa-fade' : ''}`}
          />
          <p className={styles.tabFont}>Tools</p>
        </div>
        <div
          className={styles.tab}
          onClick={() => handleTabClick('videos')}
        >
          <FontAwesomeIcon
            icon={faVideo}
            className={`${styles.icon} ${activeTab === 'videos' ? 'fa-fade' : ''}`}
          />
          <br/>
          <p className={styles.tabFont}>Videos</p>
        </div>
        <div
          className={styles.tab}
          onClick={() => handleTabClick('commands')}
        >
          <FontAwesomeIcon
            icon={faTerminal}
            className={`${styles.icon} ${activeTab === 'commands' ? 'fa-fade' : ''}`}
          />
          <br/>
          <p className={styles.tabFont}>Setup Commands</p>
        </div>
      </div>

      <div id="introduction" className={styles.info}>
          <h2>Build Your Own ClimateNet Device!</h2>
            Ready to make an impact?<br/>
            Whether you're a tech enthusiast, a climate activist, or just curious about how you can contribute to environmental data collection, this guide will walk you through building your own ClimateNet device.
            <br/>Here are a few things you should know before you start:
            <ul>
                    <li>ClimateNet Devices are comprised of hardware and software elements</li>
                    <li>We provide step-by-step instructions on how to build both components</li>
                    <li>You do not need to know how to code, just how to copy and paste!</li>
                    <li>The materials will cost you an average of $280</li>
            </ul>
            Ready to start? Just fill out the request access form and we will send you step-by-step instructions.
      </div>

      <div className={styles.content}>
        {activeTab === 'materials' && <div><Materials /></div>}
        {activeTab === 'tools' && <div><Tools /></div>}
        {activeTab === 'videos' && <div><Videos /></div>}
        {activeTab === 'commands' && <div><Commands /></div>}
      </div>

      <section id="request">
        <Contact subject_state={false} className={styles.subTitles} name={"Request Access"} />
      </section>
    </div>
  );
};

export default Guide;
