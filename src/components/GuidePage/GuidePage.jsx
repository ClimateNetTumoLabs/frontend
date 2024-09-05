import React, { useState, useEffect } from 'react';
import styles from './GuidePage.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Materials from '../Materials/Materials.jsx';
import Tools from '../Tools/Tools.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faTerminal, faList, faUserGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home'); // Set home as the default tab

  useEffect(() => {
    const isNewPageLoad = !sessionStorage.getItem('hasLoaded');

    if (isNewPageLoad) {
      // It's a new page load, default to 'home' tab
      setActiveTab('home');
      sessionStorage.setItem('hasLoaded', 'true');
    } else {
      // It's a refresh, retrieve the last active tab
      const storedTab = localStorage.getItem('activeTab');
      if (storedTab && storedTab !== 'null') {
        setActiveTab(storedTab);
      }
    }
  }, []);

    const handleTabClick = (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
      }
    };


  return (
    <div className={styles.app}>
      <div className={styles.title}>
        <h1>
          {t('diy.title1')}<br/>
          <b>{t('diy.title2')} </b>{t('diy.title3')}
        </h1>
      </div>

      <nav className={styles.navbar}>
        <div
          className={`col-2 ${styles.tab} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <a href="#home">{t('diy.tabs.home')}</a>
        </div>
        <div
          className={`col-2 ${styles.tab} ${activeTab === 'materials' ? styles.active : ''}`}
          onClick={() => handleTabClick('materials')}
        >
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          <a href="#materials">{t('diy.tabs.mat')}</a>
        </div>
        <div
          className={`col-2 ${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.icon} />
          <a href="#tools">{t('diy.tabs.tool')}</a>
        </div>
        <div
          className={`col-2 ${styles.tab} ${activeTab === 'videos' ? styles.active : ''}`}
          onClick={() => handleTabClick('videos')}
        >
          <FontAwesomeIcon icon={faUserGear} className={styles.icon} />
          <a href="#videos">{t('diy.tabs.asm')}</a>
        </div>
        <div
          className={`col-2 ${styles.tab} ${activeTab === 'commands' ? styles.active : ''}`}
          onClick={() => handleTabClick('commands')}
        >
          <FontAwesomeIcon icon={faTerminal} className={styles.icon} />
          <a href="#commands">{t('diy.tabs.setup')}</a>
        </div>
      </nav>

      {!activeTab || activeTab === 'home' ? (
        <>
        <section id="introduction" className={`col-md-8 col-12 ${styles.introduction}`}>
        <h2>{t('diy.intro.1')}<br/>
            {t('diy.intro.3')}<br/>
            {t('diy.intro.2')}</h2>
        <div className={styles.info}>
          <hr/>
          <p>{t('diy.info.title')}</p>
          <ul>
            <li>{t('diy.info.point1')}</li>
            <li>{t('diy.info.point2')}</li>
            <li>{t('diy.info.point3')}</li>
            <li>{t('diy.info.point4')}</li>
          </ul>
          <p>{t('diy.info.end1')}<a className={styles.link} href="#request">{t('contact.title2')}</a>{t('diy.info.end2')}</p>
        </div>
      </section>
      <section id="request">
      <Contact
        subject_state={false}
        className={`mb-2 col-md-8 col-12 ${styles.subTitles}`}
        name={t('contact.title2')}
        showCoordinates={true}
      />
        </section>
      </>
      ) : null}

      <div className={styles.content}>
        {activeTab === 'materials' && <Materials />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'videos' && <Videos />}
        {activeTab === 'commands' && <Commands />}
      </div>
    </div>
  );
};

export default Guide;
