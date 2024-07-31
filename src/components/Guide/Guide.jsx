import React, { useEffect } from 'react';
import styles from './Guide.module.css';
import { useTranslation } from "react-i18next";
import "../../i18n";

const Guide = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const title = document.querySelector(`.${styles.title}`);
    const numParticles = 30; // Adjusted number of particles
    const rect = title.getBoundingClientRect();

    const createFireworks = (originX, originY) => {
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const firework = document.createElement('div');
        firework.classList.add(styles.firework);
        firework.style.setProperty('--x', x);
        firework.style.setProperty('--y', y);
        firework.style.left = `${originX}px`;
        firework.style.top = `${originY}px`;
        document.body.appendChild(firework);

        firework.addEventListener('animationend', () => {
          firework.remove();
        });
      }
    };

    // Fireworks from the center
    createFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Second set of center fireworks, delayed by 500ms (half of the animation duration)
    setTimeout(() => {
      createFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }, 500);

  }, []);

  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.title}>{t('guide.title')}</h1>
      <h2 className={styles.guideTitle}>{t('guide.title2')}</h2>
      <p className={styles.guideSection}>{t('guide.intro1')}</p>
      <p className={styles.guideSection}>{t('guide.intro2')}</p>
      <h2 className={styles.guideTitle}>{t('guide.pointIntro')}</h2>
      <ul className={styles.guideSection}>
        <li>
          <strong>{t('guide.rec')}</strong>{t('guide.measure')}
          <div className={styles.guidePoints}>
            <ul>
              <li>{t('guide.temp')}</li>
              <li>{t('guide.light')}</li>
              <li>{t('guide.quality')}</li>
              <li>{t('guide.wind')}</li>
            </ul>
          </div>
        </li>
        <li><strong>{t('guide.price.title')}</strong>{t('guide.price.text')}</li>
        <li><strong>{t('guide.instruction.title')}</strong>{t('guide.instruction.text')}</li>
        <li><strong>{t('guide.integration.title')}</strong>{t('guide.integration.text')}</li>
      </ul>
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
    </div>
  );
}

export default Guide;
