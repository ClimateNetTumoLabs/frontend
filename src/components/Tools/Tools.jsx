import React from 'react';
import styles from '../Materials/Materials.module.css';
import {useTranslation} from "react-i18next";

const Tools = () => {
    const { t } = useTranslation()
    const images = require.context('../../assets/Tools', false, /\.(png|jpe?g|svg)$/);

    const getImage = (imageName) => {
      try {
        return images(`./${imageName}`);
      } catch (err) {
        console.error(`Image ${imageName} not found`);
        return null;
      }
    };

  const tools = [
  {
    name: t('diy.tools.1'),
    image: getImage('shurupovert.jpg'),
  },
  {
    name: t('diy.tools.2'),
    image: getImage('skotch.jpg')
  },
  {
    name: t('diy.tools.3'),
    image: getImage('nasadki.png'),
  },
  {
    name: t('diy.tools.4'),
    image: getImage('payalnik.png')
  },
  {
    name: t('diy.tools.5'),
    image: getImage('lanmaker.png'),
  },
  {
    name: t('diy.tools.6'),
    image: getImage('metr.jpg')
  },
  {
    name: t('diy.tools.7'),
    image: getImage('scissors.jpeg'),
  },
  {
    name: t('diy.tools.8'),
    image: getImage('fen.jpg')
  },
  {
    name: t('diy.tools.9'),
    image: getImage('provoda.png'),
  },
  {
    name: t('diy.tools.10'),
    image: getImage('cutter.png')
  },
  {
    name: t('diy.tools.11'),
    image: getImage('father.png'),
  },
  {
    name: t('diy.tools.12'),
    image: getImage('gubci.jpg')
  },
  {
    name: t('diy.tools.13'),
    image: getImage('rosin.jpeg'),
  },
  {
    name: t('diy.tools.14'),
    image: getImage('spacer.png')
  },
  {
    name: t('diy.tools.15'),
    image: getImage('spirt.jpg'),
  },
  {
    name: t('diy.tools.16'),
    image: getImage('brush.jpeg')
  },
  {
    name: t('diy.tools.17'),
    image: getImage('compass.png')
  },
  {
    name: t('diy.tools.18'),
    image: getImage('pincet.png'),
  },
  {
    name: t('diy.tools.19'),
    image: getImage('silicone.jpg')
  },
  {
    name: t('diy.tools.20'),
    image: getImage('tester.jpg'),
  },
  {
    name: t('diy.tools.21'),
    image: getImage('screwdriver.jpeg')
  },
  {
    name: t('diy.tools.22'),
    image: getImage('solder wire.jpeg'),
  },
  {
    name: t('diy.tools.23'),
    image: getImage('laq.jpeg')
  },
  ];

  return (
    <div className={styles.bomContainer}>
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
