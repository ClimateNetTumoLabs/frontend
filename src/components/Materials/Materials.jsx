import React, {useState} from 'react';
import styles from './Materials.module.css';

function Materials() {

    return (
        <section id="materials" className={styles.section}>
        <h2 className={styles.subTitles}>Materials</h2>
        <div className={styles.iframeContainer}>
          <iframe
           src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkuyOQ-IsJ_mVSOgXvKZAJk5bNVHLsC5Zw0wZY_nWIHIX1n6U_zZaM9t64Xfaw17XiasjLBShyeAHi/pubhtml?gid=0&single=true&rm=minimal"
            className={styles.iframe}
            title="Materials List"
          ></iframe>
        </div>
      </section>

     );

    }

export default Materials;