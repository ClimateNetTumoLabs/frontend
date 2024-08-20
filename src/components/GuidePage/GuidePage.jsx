import React, { useState } from 'react';
import styles from './GuidePage.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Materials from '../Materials/Materials.jsx';
import Tools from '../Tools/Tools.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faTerminal, faList, faUserGear } from '@fortawesome/free-solid-svg-icons';

const Guide = () => {

  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab); // Toggle visibility
  };

  return (
    <div className={styles.app}>
      <div className={styles.title}>
        <h1>
          Build Your Own <br/><b>ClimateNet</b> Device!
        </h1>
      </div>


      <nav className={styles.navbar}>
        <div
          className={`${styles.tab} ${activeTab === 'materials' ? styles.active : ''}`}
          onClick={() => handleTabClick('materials')}
        >
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          <p>Materials</p>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.icon} />
          <p>Tools</p>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'videos' ? styles.active : ''}`}
          onClick={() => handleTabClick('videos')}
        >
          <FontAwesomeIcon icon={faUserGear} className={styles.icon} />
          <p>Assembly</p>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'commands' ? styles.active : ''}`}
          onClick={() => handleTabClick('commands')}
        >
          <FontAwesomeIcon icon={faTerminal} className={styles.icon} />
          <p>Setup Commands</p>
        </div>
      </nav>

     {!activeTab && (
        <div id="introduction" className={styles.introduction}>
            <h2>Ready to make an impact?<br/>
            Whether you're a tech enthusiast, a climate activist, or just curious, this guide is for you.<br/>
            Start now and make a difference!</h2>
                <div className={styles.info}>
                    <hr/>
                  <p>Here are a few things you should know before you start:</p>
                  <ul>
                    <li>ClimateNet Devices are comprised of hardware and software elements </li>
                    <li>We provide step-by-step instructions on how to build both components </li>
                    <li>You do not need to know how to code, just how to copy and paste! </li>
                    <li>The materials will cost you an average of $280 </li>
                    <p>Ready to start? Just fill out the request access form, and we will send you step-by-step instructions.</p>
                  </ul>
                </div>
      </div>
      )}


      <div className={styles.content}>
        {activeTab === 'materials' && <Materials />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'videos' && <Videos />}
        {activeTab === 'commands' && <Commands />}
      </div>
      <section id="request">
        <Contact subject_state={false} className={styles.subTitles} name={"Request Access"} />
      </section>
    </div>
  );
};

export default Guide;
