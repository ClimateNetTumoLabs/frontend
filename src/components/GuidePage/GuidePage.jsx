import React, {useState} from 'react';
import styles from './GuidePage.module.css';
import Contact from '../Contact/Contact.jsx';
import Commands from '../Commands/Commands.jsx';
import Videos from '../Videos/Videos.jsx';
import Materials from '../Materials/Materials.jsx';
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
        className={styles.tab1}
        onClick={() => handleTabClick('materials')}
        >
            <FontAwesomeIcon icon={faList} className={styles.icon}/>
        </div>
        <div
        className={styles.tab2}
        onClick={() => handleTabClick('tools')}
        >
            <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.icon}/>
        </div>
        <div
        className={styles.tab3}
        onClick={() => handleTabClick('videos')}
        >
            <FontAwesomeIcon icon={faVideo} className={styles.icon}/>
        </div>
        <div
        className={styles.tab4}
        onClick={() => handleTabClick('commands')}
        >
            <FontAwesomeIcon icon={faTerminal} className={styles.icon}/>
        </div>
      </div>
      <div className={styles.content}>
        {activeTab === 'materials' && <div><Materials/></div>}
        {activeTab === 'tools' && <div>Tools Content</div>}
        {activeTab === 'videos' && <div><Videos/></div>}
        {activeTab === 'commands' && <div><Commands/></div>}
      </div>

        <Contact  subject_state = {false} className={styles.subTitles} name = {"Request Access"} />

    </div>
  );
};

export default Guide;
