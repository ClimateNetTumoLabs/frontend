import React, { useState } from 'react';
import styles from './DIY.module.css';
import {useTranslation} from "react-i18next";

function DIY() {

    const {t} = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send formData to your backend or API
  };


  return (
    <div className={styles.app}>
        <h1>{t('diy.title')}</h1>
        <p className={styles.guideSection}>{t('guide.future')}</p>
      <div className={styles.guideSection}>
        <h2 className={styles.guideTitle}>{t('guide.benefit.title')}</h2>
        <h3 className={styles.guideSubTitle}>{t('guide.benefit.project.title')}</h3>
        <ul>
          <li>{t('guide.benefit.project.customization')}</li>
          <li>{t('guide.benefit.project.data')}</li>
        </ul>
        <h3 className={styles.guideSubTitle}>{t('guide.benefit.user.title')}</h3>
        <ul>
          <li>{t('guide.benefit.user.learning')}</li>
          <li>{t('guide.benefit.user.cost')}</li>
          <li>{t('guide.benefit.user.data')}</li>
        </ul>
      </div>

      <section id="cost" className={styles.titles}>
        <h2>Cost of Device</h2>
        <p>The device will cost approximately $280</p>
      </section>

      <section id="materials" className={styles.section}>
        <h2>Materials</h2>
        <div className={styles.iframeContainer}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkuyOQ-IsJ_mVSOgXvKZAJk5bNVHLsC5Zw0wZY_nWIHIX1n6U_zZaM9t64Xfaw17XiasjLBShyeAHi/pubhtml?gid=0&single=true"
            width="100%"
            height="600px"
            className={styles.iframe}
            title="Materials List"
          ></iframe>
        </div>
      </section>


        <section id="tools" className={styles.section}>
        <h2>Tools</h2>
        <div className={styles.iframeContainer}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT4fWMNatW1r2VK-2rD61vt8-a2fsc_qi0mSBlPrZ84HOYQPQ69zXzKOY7H9fyOknqrfhFS2uKyTIJX/pubhtml?gid=0&single=true"
            width="100%"
            height="600px"
            className={styles.iframe}
            title="Tools List"
          ></iframe>
        </div>
      </section>

      <section id="videos" className={styles.section}>
        <h2>Videos of Assembling</h2>
        <ul>
          <iframe src="https://www.youtube.com/embed/example1" title="Video 1"></iframe>
          <iframe src="https://www.youtube.com/embed/example2" title="Video 2"></iframe>
        </ul>
      </section>

      <section id="git" className={styles.section}>
        <h2>Git Commands</h2>
        <pre>
          <code>
            git clone https://example.com/repo.git
          </code>
        </pre>
      </section>

      <section id="contact" className={styles.section}>
        <h2>Contact</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default DIY;
