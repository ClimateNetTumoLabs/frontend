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
    name: 'Drill Driver',
    image: getImage('shurupovert.jpg'),
  },
  {
    name: 'Double Sided Tape',
    image: getImage('skotch.jpg')
  },
  {
    name: 'Bits (Step Drill Bit, Ph2 Bit, GP0205-850 Bit)',
    image: getImage('nasadki.png'),
  },
  {
    name: 'Soldering Iron',
    image: getImage('payalnik.png')
  },
  {
    name: 'LAN Cable maker and wire stripper',
    image: getImage('lanmaker.png'),
  },
  {
    name: 'Tape Measure',
    image: getImage('metr.jpg')
  },
  {
    name: 'Scissors',
    image: getImage('scissors.jpeg'),
  },
  {
    name: 'Soldering Heat Gun',
    image: getImage('fen.jpg')
  },
  {
    name: 'Stranded Wires(Red, Black, Green, Yellow)',
    image: getImage('provoda.png'),
  },
  {
    name: 'Wire Cutter',
    image: getImage('cutter.png')
  },
  {
    name: 'Dupont Jumper Wire Cable Housing Male Pin(4 psc.) and Dupont connector (1x4)',
    image: getImage('father.png'),
  },
  {
    name: 'Pliers',
    image: getImage('gubci.jpg')
  },
  {
    name: 'Rosin for Soldering',
    image: getImage('rosin.jpeg'),
  },
  {
    name: 'Plastic Spacer',
    image: getImage('spacer.png')
  },
  {
    name: 'Alcohol for Degreasing',
    image: getImage('spirt.jpg'),
  },
  {
    name: 'Board Cleaning Brush, Any brush will work',
    image: getImage('brush.jpeg')
  },
  {
    name: 'Compass',
    image: getImage('compass.png')
  },
  {
    name: 'Tweezers',
    image: getImage('pincet.png'),
  },
  {
    name: 'Aquarium Silicone',
    image: getImage('silicone.jpg')
  },
  {
    name: 'Tester',
    image: getImage('tester.jpg'),
  },
  {
    name: 'Philips screwdriver',
    image: getImage('screwdriver.jpeg')
  },
  {
    name: 'Solder Wire',
    image: getImage('solder wire.jpeg'),
  },
  {
    name: 'Acrylic varnish for circuit boards',
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
            <th>Item</th>
            <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tools, index) => (
              <tr key={index}>
                <td data-label="Item">{tools.name}</td>
                <td data-label="Image"><img src={tools.image} alt={tools.name} className={styles.image} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tools;
