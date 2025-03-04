import React, { useState, useEffect, useRef } from 'react';
import styles from './DIY.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Materials from '../Materials/Materials.jsx';
import Tools from '../Tools/Tools.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faTerminal, faList, faUserGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';


const DIY = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const requestRef = useRef(null);
  const [scrollToRequest, setScrollToRequest] = useState(false);

  const handleRequestAccessClick = () => {
    setScrollToRequest(true);
    setActiveTab('home');
  };

  useEffect(() => {
      const storedTab = localStorage.getItem('activeTab');
        setActiveTab(storedTab);
  }, []);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      localStorage.setItem('activeTab', tab);
    }
  };

  useEffect(() => {
    if (scrollToRequest && activeTab === 'home') {
      const section = document.getElementById("request");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollToRequest, activeTab]);

  return (
    <div className={styles.app}>
          <Helmet>
                <title>How to build a DIY ClimateNet Device</title>
      </Helmet>
      <div className={styles.title}>
        <h1>
          {t('diy.title1')}<br/>
          <b>{t('diy.title2')} </b>{t('diy.title3')}
        </h1>
      </div>

      <nav className={styles.navbar}>
        <a
          href="#home"
          className={`col-2 ${styles.tab} ${activeTab === 'home' ? styles.active : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <p>{t('diy.tabs.home')}</p>
        </a>
        <a
          href="#materials"
          className={`col-2 ${styles.tab} ${activeTab === 'materials' ? styles.active : ''}`}
          onClick={() => handleTabClick('materials')}
        >
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          <p>{t('diy.tabs.mat')}</p>
        </a>
        <a
          href="#tools"
          className={`col-2 ${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.icon} />
          <p>{t('diy.tabs.tool')}</p>
        </a>
        <a
          href="#videos"
          className={`col-2 ${styles.tab} ${activeTab === 'videos' ? styles.active : ''}`}
          onClick={() => handleTabClick('videos')}
        >
          <FontAwesomeIcon icon={faUserGear} className={styles.icon} />
          <p>{t('diy.tabs.asm')}</p>
        </a>
        <a
          href="#commands"
          className={`col-2 ${styles.tab} ${activeTab === 'commands' ? styles.active : ''}`}
          onClick={() => handleTabClick('commands')}
        >
          <FontAwesomeIcon icon={faTerminal} className={styles.icon} />
          <p>{t('diy.tabs.setup')}</p>
        </a>
      </nav>

      {!activeTab || activeTab === 'home' ? (
        <>
        <section className={`col-md-8 col-12 ${styles.introduction}`}>
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
      <section id="request" ref={requestRef}>
      <Contact
        className={`mb-2 col-md-8 col-12 ${styles.subTitles}`}
        name={t('contact.title2')}
        showCoordinates={true}
        subject={t('contact.options.request')}
      />
        </section>
      </>
      ) : null}

      <div className={styles.content}>
        {activeTab === 'materials' && <Materials />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'videos' && <Videos />}
        {activeTab === 'commands' && <Commands onRequestAccessClick={handleRequestAccessClick} />}
      </div>
    </div>
  );
};

export default DIY;