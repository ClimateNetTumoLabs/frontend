import React from 'react';
import styles from '../Materials/Materials.module.css';
import {useTranslation} from "react-i18next";

const Tools = () => {
    const { t } = useTranslation()

  const tools = [
  {
    name: t('diy.tools.1'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/shurupovert.jpg"
  },
  {
    name: t('diy.tools.2'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/skotch.jpg"
  },
  {
    name: t('diy.tools.3'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/nasadki.png"
  },
  {
    name: t('diy.tools.4'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/payalnik.png"
  },
  {
    name: t('diy.tools.5'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/lanmaker.png"
  },
  {
    name: t('diy.tools.6'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/metr.jpg"
  },
  {
    name: t('diy.tools.7'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/scissors.jpeg"
  },
  {
    name: t('diy.tools.8'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/fen.jpg"
  },
  {
    name: t('diy.tools.9'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/provoda.png"
  },
  {
    name: t('diy.tools.10'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/cutter.png"
  },
  {
    name: t('diy.tools.11'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/father.png"
  },
  {
    name: t('diy.tools.12'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/gubci.jpg"
  },
  {
    name: t('diy.tools.13'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/rosin.jpeg"
  },
  {
    name: t('diy.tools.14'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/spacer.png"
  },
  {
    name: t('diy.tools.15'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/spirt.jpg"
  },
  {
    name: t('diy.tools.16'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/brush.jpeg"
  },
  {
    name: t('diy.tools.17'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/compass.png"
  },
  {
    name: t('diy.tools.18'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/pincet.png"
  },
  {
    name: t('diy.tools.19'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/silicone.jpg"
  },
  {
    name: t('diy.tools.20'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/tester.jpg"
  },
  {
    name: t('diy.tools.21'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/screwdriver.jpeg"
  },
  {
    name: t('diy.tools.22'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/solder wire.jpeg"
  },
  {
    name: t('diy.tools.23'),
    image: "https://images-in-website.s3.us-east-1.amazonaws.com/Tools/laq.jpeg"
  },
  ];

  return (
    <div id="tools" className={`container mb-2 col-md-8 col-12 ${styles.bomContainer}`}>
      <h2 className={styles.title}>{t('diy.tabs.tooltitle')}</h2>

      <div className={styles.section}>
        <table className={styles.table}>
          <thead>
            <tr>
            <th>{t('diy.tools.item')}</th>
            <th>{t('diy.tools.image')}</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tools, index) => (
              <tr key={index}>
                <td data-label={t('diy.tools.item')}>{tools.name}</td>
                <td data-label={t('diy.tools.image')}><img src={tools.image} alt={tools.name} className={styles.image} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tools;
