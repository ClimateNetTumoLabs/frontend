import React, { useState, useEffect } from 'react';
import styles from './GuidePage.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Materials from '../Materials/Materials.jsx';
import Tools from '../Tools/Tools.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faTerminal, faList, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || null);

  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('activeTab', activeTab);
    } else {
      localStorage.removeItem('activeTab');
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
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
          className={`${styles.tab} ${activeTab === 'materials' ? styles.active : ''}`}
          onClick={() => handleTabClick('materials')}
        >
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          <a href="#materials">{t('diy.tabs.mat')}</a>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.icon} />
          <a href="#tools">{t('diy.tabs.tool')}</a>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'videos' ? styles.active : ''}`}
          onClick={() => handleTabClick('videos')}
        >
          <FontAwesomeIcon icon={faUserGear} className={styles.icon} />
          <a href="#videos">{t('diy.tabs.asm')}</a>
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'commands' ? styles.active : ''}`}
          onClick={() => handleTabClick('commands')}
        >
          <FontAwesomeIcon icon={faTerminal} className={styles.icon} />
          <a href="#commands">{t('diy.tabs.setup')}</a>
        </div>
      </nav>

      {!activeTab && (
        <section id="introduction" className={styles.introduction}>
          <h2>{t('diy.intro.1')}<br/>
              {t('diy.intro.2')}<br/>
              {t('diy.intro.3')}</h2>
          <div className={styles.info}>
            <hr/>
            <p>{t('diy.info.title')}</p>
            <ul>
              <li>{t('diy.info.point1')}</li>
              <li>{t('diy.info.point2')}</li>
              <li>{t('diy.info.point3')}</li>
              <li>{t('diy.info.point4')}</li>
            </ul>
            <p>{t('diy.info.end')}</p>
          </div>
        </section>
      )}

      <div className={styles.content}>
        {activeTab === 'materials' && <Materials />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'videos' && <Videos />}
        {activeTab === 'commands' && <Commands />}
      </div>
      <section id="request">
        <Contact subject_state={false} className={styles.subTitles} name={t('contact.title2')} />
      </section>
    </div>
  );
};

export default Guide;
