import React, {useState} from 'react';
import styles from './Tools.module.css';

function Tools() {

    return (
        <section id="tools" className={styles.section}>
        <h2 className={styles.subTitles}>Tools</h2>
        <div className={styles.iframeContainer}>
          <iframe
           src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT4fWMNatW1r2VK-2rD61vt8-a2fsc_qi0mSBlPrZ84HOYQPQ69zXzKOY7H9fyOknqrfhFS2uKyTIJX/pubhtml?gid=0&single=true"
            className={styles.iframe}
            title="Tools List"
          ></iframe>
        </div>
      </section>

     );

    }

export default Tools;