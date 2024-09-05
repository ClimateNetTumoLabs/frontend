import React from 'react';
import styles from './Materials.module.css';
import {useTranslation} from "react-i18next";

const Materials = () => {
    const { t } = useTranslation();
    const images = require.context('../../assets/Materials', false, /\.(png|jpe?g|svg)$/);

    const getImage = (imageName) => {
      try {
        return images(`./${imageName}`);
      } catch (err) {
        console.error(`Image ${imageName} not found`);
        return null;
      }
    };

  const materials = [
    {
      name: t('diy.materials.item.1'),
      quantity: 1,
      description: '158x90x60',
      costamazon: '$9.78',
      amazon: 'https://www.amazon.com/LMioEtool-Waterproof-Dustproof-Universal-Enclosure/dp/B0BFF5PJQS/ref=sr_1_1_sspa?crid=NHJH06HQVAKS&keywords=ABS%2BWaterproof%2BBox%2BElectronic%2BSafe%2BCase%2BPlastic%2BBoxes%2BBlack%2BWire%2BJunction%2BBox%2BPlastic%2BOrganizer%2BIP67%2BWaterproof%2BEnclosure&qid=1681909076&sprefix=abs%2Bwaterproof%2Bbox%2Belectronic%2Bsafe%2Bcase%2Bplastic%2Bboxes%2Bblack%2Bwire%2Bjunction%2Bbox%2Bplastic%2Borganizer%2Bip67%2Bwaterproof%2Benclosure%2Caps%2C471&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExN0FDNERCTU0wUEk1JmVuY3J5cHRlZElkPUEwODU2MDc0MVFHTFNHRDJDMUpIMCZlbmNyeXB0ZWRBZElkPUEwMjUzNzA3M1BHOVFRMzZGUkdYQyZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1',
      costaliexpress: '$3.12',
      aliexpress: 'https://aliexpress.ru/item/1005007478398238.html?sku_id=12000040918154998&spm=a2g2w.productlist.search_results.4.683623b4TaoqsO',
      image: getImage('rpicase.png')
    },
    {
      name: t('diy.materials.item.2'),
      quantity: 4,
      description: t('diy.materials.desc.2'),
      costamazon: '$1',
      image: getImage('screw.png')
    },
    {
      name: t('diy.materials.item.3'),
      quantity: 1,
      costamazon: '$9.99',
      amazon: 'https://www.amazon.com/PMMCON-AMS1117-LM1117-Voltage-Regulator/dp/B0BNY8KM87/ref=sr_1_2_sspa?crid=10MP2CPUHF30I&dib=eyJ2IjoiMSJ9.hTQEFMPzWzovJ8026bKrW_uCj7ShfVDQQPaqTZJyFDnFtOE5Ws4hEuoYy5ribR_A_YMjEJA9q1lsBZBwfwXkGPHuEgPQ5WQb7d__kWvkdcHRxVJzBgcatt75bBPgX-DqIEE737bhyOzATN8DlaJ0IJK3ERbzs_KtjEBqAs9sc8s-fpZfVQfbhecRPG95vpLbtksB8QcnybHHusdufFmo88bTMsb-GqmnJRJaPs4HU5o.-IjWyrZz4tdhSax4XeJ2qm0hkUvTyXS1aemOD5AWYrk&dib_tag=se&keywords=AMS1117-3.3%2C+Linear+Low+Dropout+Regulator%2C+800mA%2C+3.3V&qid=1710411007&sprefix=ams1117-3.3%2C+linear+low+dropout+regulator%2C+800ma%2C+3.3v%2Caps%2C242&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
      costaliexpress: '$0.75',
      aliexpress: 'https://aliexpress.ru/item/1005003916318045.html?sku_id=12000027459201018&spm=a2g2w.productlist.search_results.11.293bea2a3lPT0X',
      image: getImage('ams.png')
    },
    {
      name: t('diy.materials.item.4'),
      quantity: 2,
      description: '8P8C (RJ45)',
      costamazon: '$8.99',
      amazon: 'https://www.amazon.com/Antrader-30pcs-Modular-Telephone-Connector/dp/B07CWJZSPC/ref=pd_lpo_sccl_3/147-4206659-3064967?pd_rd_w=7iHxM&content-id=amzn1.sym.eb6ee5e1-c2c2-48f8-a92b-80fda933018c&pf_rd_p=eb6ee5e1-c2c2-48f8-a92b-80fda933018c&pf_rd_r=2PRYZ8RT3DBHPRAFWR3C&pd_rd_wg=zLXwK&pd_rd_r=b6e457a2-469a-4757-af0c-cc5d0c40a401&pd_rd_i=B07CWJZSPC&psc=1',
      costaliexpress: '$6.22',
      aliexpress: 'https://aliexpress.ru/item/1005006970345397.html?sku_id=12000038893550736&spm=a2g2w.productlist.search_results.8.5b4c37f9UTOcrs',
      image: getImage('rj45.png')
    },
    {
      name: t('diy.materials.item.5'),
      quantity: 2,
      description: t('diy.materials.desc.5'),
      costamazon: '$6.89',
      amazon: 'https://www.amazon.com/Lon0167-Modular-Connector-Telephone-Telefon/dp/B09FNX7M9R/ref=sr_1_4?crid=2P7TDP9M11BO5&dib=eyJ2IjoiMSJ9._I3WFQRjEGVBJO7zdz2NuIHnQlLc3aH_VMDih_FxZEwX4F0HcRPgjpyyzkIpK4L7eYgmdnPNS9jTKsAjFYsAcxfLRmjHrn4gIOjbKfhv9jT_WI1-0_0fKme3hgJGH__WbGprjLLmpTFO32rNg1CMaY8EeDw5BO8HlIRs4buzDihR0dezsrVsVenQdPIcFmfPm0fTNGYGMZSMtvhdsdRMqO4xwvwMIgKdveyqI9lvURo.VGGgjR39_k-5s2z7bU-gMBQ-Gc2tfgvz4trMvMITU4Q&dib_tag=se&keywords=6P6C+6+Pin+RJ11+Modular+Connector+Telephone+PCB+Jacks&qid=1711979284&sprefix=socket+6p6c+rj25+%2Caps%2C191&sr=8-4',
      costaliexpress: '$1.88',
      aliexpress: 'https://aliexpress.ru/item/3256805812151038.html?gatewayAdapt=glo2rus4itemAdapt',
      image: getImage('rj25.png')
    },
    {
      name: 'PCB 1',
      quantity: 1,
      description: t('diy.materials.desc.6'),
      costamazon: '$0.40',
      amazon: 'https://cart.jlcpcb.com/quote?orderType=1&homeUploadNum=d8a25695ec0948a596e2ec9007b41979&businessType=example&fileName=Gerber_RaspberryPCB-copy_Raspberry_PCB-copy_2024-08-07.zip',
      image: getImage('pcb1.png')
    },
    {
      name: 'PCB 2',
      quantity: 1,
      description: t('diy.materials.desc.7'),
      costamazon: '$1.20',
      amazon: 'https://cart.jlcpcb.com/quote?orderType=1&homeUploadNum=481a2a2687f74934b287ec8d48a1e943&businessType=example&fileName=Sensor_Block_PCB.zip',
      image: getImage('pcb2.png')
    },
    {
      name: t('diy.materials.item.8'),
      quantity: 2,
      description: t('diy.materials.desc.8'),
      costamazon: '$6.99',
      amazon: 'https://www.amazon.com/dp/B07DH83YXT?psc=1&ref=ppx_yo2ov_dt_b_product_details',
      costaliexpress: '$3.25',
      aliexpress: 'https://aliexpress.ru/item/32968895113.html?sku_id=66585085843&spm=a2g2w.productlist.search_results.0.12479b5b48Wra0',
      image:  getImage('blackplastic.png')
    },
    {
      name: t('diy.materials.item.9'),
      quantity: 1,
      description: t('diy.materials.desc.9'),
      image:  getImage('lan.png')
    },
    {
      name: t('diy.materials.item.10'),
      quantity: '1x4:2 1x20:2 1x8:1 1x6:1',
      description: t('diy.materials.desc.10'),
      costamazon: '$9.99',
      amazon: 'https://www.amazon.com/gp/product/B0B96WXT46/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1',
      costaliexpress: '$9.37',
      aliexpress: 'https://aliexpress.ru/item/1005006515275662.html?spm=a2g2w.productlist.0.0.643f5707D7iNfA&sku_id=12000037494039280',
      image: getImage('combined-pins.png'),
    },
    {
      name: t('diy.materials.item.11'),
      quantity: 3,
      description: t('diy.materials.desc.11'),
      costamazon: '$0.46',
      amazon: 'https://www.amazon.com/TELESKY-100pcs-0603-Resistor-0%CE%A9-10M%CE%A9/dp/B0CXDZFNT3/ref=sr_1_16?crid=11HEYQ3APMB8M&dib=eyJ2IjoiMSJ9.3q_Tq6Mhp9p5p_2MHC3o919Md-zO1054G4dIfjIwIqDprh7mb1LviVM2niQMgUwOwRee5jMLnW8dmcV-9N4COGSvP9XMnge6SrxQ8tSKJT6CvXqUrE_8V7puRPSnEX0vQ2czUpgDRG9pveR6RccHVp32E835pnFhk5wQ0Tt6aM5w_QxzVcADwZKu8TJ7a0RJQK1sAVX93TQIALCYNCaZy8GmSn3-QwSg3jtQlefu3Bc.6BE9RV2Rlta2CiRudj5JCJ5TY3yE9p1eHQHMSfZZrBs&dib_tag=se&keywords=0603%2BSMD%2BResistor%2B10K%2B%CE%A9%2Bohm&qid=1724150497&sprefix=smd%2Bresistor%2B10k%2Bohm%2B0603%2Caps%2C536&sr=8-16&th=1',
      costaliexpress: '$0.54',
      aliexpress: 'https://aliexpress.ru/item/1005005933733741.html?sku_id=12000034911575041&spm=a2g2w.productlist.search_results.3.6fdeadcfTYmSco',
      image: getImage('smd.png')
    },
    {
      name: 'MCP3008-I/P Mcp3008 8-Channel 10-Bit ADC',
      quantity: 1,
      description: t('diy.materials.desc.12'),
      costamazon: '$4.95',
      amazon: 'https://www.amazon.com/Adafruit-MCP3008-8-Channel-Interface-Raspberry/dp/B00NAY3RB2',
      costaliexpress: '$3.85',
      aliexpress: 'https://aliexpress.ru/item/1005004030807322.html?sku_id=12000027800588895&spm=a2g2w.productlist.search_results.0.c54e5cdbblRp2B',
      image: getImage('mcp3008.png')
    },
    {
      name: 'Chip socket adapter 8 pins',
      quantity: 1,
      description: '2x8',
      costamazon: '$7.95',
      amazon: 'https://www.amazon.com/Uxcell-a11090300ux0244-2-54mm-Socket-Adaptors/dp/B0079SM1LW/ref=pd_pss_dp_d_1_d_sccl_1_5/142-1244740-3118929?pd_rd_w=awR8m&content-id=amzn1.sym.427cdbb1-779c-4be6-8c9b-81ddadc2ade4&pf_rd_p=427cdbb1-779c-4be6-8c9b-81ddadc2ade4&pf_rd_r=5ZA1A6DFFBJEQCETNGKW&pd_rd_wg=nH2pe&pd_rd_r=e5fe0f43-9fb4-4b0d-b5d4-242e56356376&pd_rd_i=B0079SM1LW&psc=1',
      costaliexpress: '$0.80',
      aliexpress: 'https://aliexpress.ru/item/1005004558075324.html?spm=a2g2w.detail.similar_rcmd.1.2bdc771eXrxCUk&mixer_rcmd_bucket_id=aerabtestalgoRecommendAbV2_controlRu2&pdp_trigger_item_id=0_1005007159533002&ru_algo_pv_id=c6a62b-61b690-c660a9-b57b40-1724151600&scenario=aerSimilarItemPdpRcmd&sku_id=12000029606316673&traffic_source=recommendation&type_rcmd=core',
      image:  getImage('chipsocket.png')
    },
    {
      name: 'Raspberry Pi3 Model B+',
      quantity: 1,
      description: t('diy.materials.desc.14'),
      costamazon: '$43.00',
      amazon: 'https://www.amazon.com/Raspberry-Pi-Model-Board-Plus/dp/B0BNJPL4MW/ref=sr_1_1_mod_primary_new?crid=3S4GEMNKPTYSO&dib=eyJ2IjoiMSJ9.cOMIHbEDmTeJmqWPx5L4syBAbZZ5t5LEmCjGyxjriNvddy-Y2oKwOBuPsQjW_YNK7UYFMNDfKSMByJJH64Ket6zNP2y9JQeJQHFspghp7Qf6vRnBMrYtyDqDZoEJKzGSjk4YEEYSa_ffw1hHTApPEv8qZ-un_Oin2J3B8N43IUJq3isazETGI1C33TM_1rulBJvtEFMZjS7E8r820dT-LVWvfQ-CQ35dN86mWtkLM10.BKbvp5z1d2ZWSO_8W_vrK5ylDoa_XapzRiv_aVhvAck&dib_tag=se&keywords=Raspberry+Pi3+Model+B%2B&qid=1724150404&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=raspberry%2Bpi%2B3b%2B%2B%2Caps%2C558&sr=8-1',
      costaliexpress: '$43.90',
      aliexpress: 'https://aliexpress.ru/item/1005005686303304.html?sku_id=12000034009583353&spm=a2g2w.productlist.search_results.1.72e52a9aMltc1O',
      image: getImage('rpi.png')
    },
    {
      name: t('diy.materials.item.15'),
      quantity: 1,
      description: t('diy.materials.desc.15'),
      costamazon: '$19.95',
      amazon: 'https://www.amazon.com/dp/B00VSXENM4?ref=ppx_pop_dt_b_asin_title&th=1',
      costaliexpress: '$19.95',
      aliexpress: 'https://www.amazon.com/dp/B00VSXENM4?ref=ppx_pop_dt_b_asin_title&th=1',
      image: getImage('case.png')
    },
    {
      name: 'BME280 3.3V',
      quantity: 1,
      description: t('diy.materials.desc.16'),
      costamazon: '$4.30',
      amazon: 'https://www.amazon.com/Atmospheric-Pressure-GY-BME280-3-3-Temperature-Humidity/dp/B0BM9JTPQF/ref=sr_1_2?crid=IPL6PVQS11L9&keywords=bme280&qid=1678714007&sprefix=BME%2Caps%2C268&sr=8-2&th=1',
      costaliexpress: '$2.87',
      aliexpress: 'https://aliexpress.ru/item/32662970772.html?sku_id=12000028195184870&spm=a2g2w.productlist.search_results.5.19be1e2btICcJw',
      image: getImage('bme280.png')
    },
    {
      name: 'LTR390',
      quantity: 1,
      description: t('diy.materials.desc.17'),
      costamazon: '$4.95',
      amazon: 'https://www.adafruit.com/product/4831',
      costaliexpress: '$4.96',
      aliexpress: 'https://aliexpress.ru/item/1005006363642085.html?sku_id=12000036901984673&spm=a2g2w.productlist.search_results.0.1eed76cdqm6mXD',
      image: getImage('ltr390.png')
    },
    {
      name: t('diy.materials.item.18'),
      quantity: 1,
      description: t('diy.materials.desc.18'),
      costamazon: '$69.00',
      aliexpress: '',
      costaliexpress: '',
      amazon: 'https://www.argentdata.com/catalog/product_info.php?products_id=145',
      image: getImage('assembly.png')
    },
    {
      name: t('diy.materials.item.19'),
      quantity: 1,
      description: t('diy.materials.desc.19'),
      costamazon: '$39.95',
      amazon: 'https://www.adafruit.com/product/3686#:~:text=(PM2.,scattering%20light%20change%20with%20time.',
      costaliexpress: '$13.63',
      aliexpress: ['https://aliexpress.ru/item/32822333067.html?sku_id=64963208962&spm=a2g2w.productlist.search_results.15.22d76130DpnmeU',
                   'https://aliexpress.ru/item/33022030830.html?sku_id=67202977900&spm=a2g2w.productlist.search_results.7.42784881Hoplsa'],
      image: getImage('pms.png')
    },
    {
      name: t('diy.materials.item.20'),
      quantity: 1,
      description: t('diy.materials.desc.20'),
      costamazon: '$9.82',
      amazon: 'https://www.amazon.com/Sandisk-Ultra-Micro-UHS-I-Adapter/dp/B073K14CVB/ref=sr_1_3?crid=36BHDU662DG64&keywords=micro%2Bsd%2B16gb&qid=1707404818&sprefix=micro%2Bsd%2B16gb%2Caps%2C234&sr=8-3&th=1',
      costaliexpress: '$2.43',
      aliexpress: 'https://aliexpress.ru/item/1005007103731900.html?sku_id=12000039414557289&spm=a2g2w.productlist.search_results.1.789c737bem5jBk',
      image: getImage('sdcard.png')
    },
    {
      name: t('diy.materials.item.21'),
      quantity: 1,
      description: t('diy.materials.desc.21'),
      costamazon: '$14.95',
      amazon: 'https://www.amazon.sg/DURADOM-Acrylic-Flange-Plastic-Hemisphere/dp/B0814BKKHF/ref=sr_1_1?crid=1PUVPOTZFOITG&dib=eyJ2IjoiMSJ9._AGpkyOROMNg4WzL2VtARQ.6qVPEYohID8kXyp4l88ATFZ7JOMoQJ-CMx63Q-OXnEw&dib_tag=se&keywords=Transparent+Cover+Floating+Fish+Dome+%283.2+inch+%2F+80mm%29&qid=1724687529&sprefix=transparent+cover+floating+fish+dome+3.2+inch+%2F+80mm+%2Caps%2C546&sr=8-1',
      costaliexpress: '$8.70',
      aliexpress: 'https://aliexpress.ru/item/1005004547219022.html?sku_id=12000029566286060&spm=a2g2w.productlist.search_results.8.6e403773o8OdEH',
      image:  getImage('acrylic.png')
    },
    {
      name: t('diy.materials.item.22'),
      quantity: 1,
      costamazon: '$5.99',
      amazon: 'https://www.amazon.com/AT24C32-Replace-Arduino-Batteries-Included/dp/B07Q7NZTQS/ref=sr_1_4?dib=eyJ2IjoiMSJ9.jbwcdeAKmUmIb5DljPX3XcF2k0jSjUg_hFO8vBuhhAkxdLWe0Q6KIvzuoLQxhltJyRqJxtSy8padAvoqwb1OxaXvF36rHIXyBAczni22SNGM2OFhVa9tHFNTO-C4rPMEmYIFY_TiCYFgzVpgkaduKSLndzRYaFYcDpTezxoLZy-qt17ORaLCoeT8JCkTBav9ExxvZmZNCA5mWQ4PumlFojAmAQlBLHzx2EGJM0tQ-ws.tneZIhEsFDUN4A4-r_s23M4-3GHyYShoq0TQ8xv7kzw&dib_tag=se&keywords=DS3231&qid=1724150105&sr=8-4&th=1',
      costaliexpress: '$0.77',
      aliexpress: 'https://aliexpress.ru/item/1005006885814402.html?sku_id=12000038618508654&spm=a2g2w.productlist.search_results.3.37a06935jkFPLu',
      image: getImage('rtc.png')
    },
        {
      name: t('diy.materials.item.23'),
      quantity: 1,
      description: 'CR2032',
      costamazon: '$3.40',
      amazon: 'https://www.amazon.com/Duracell-Lithium-Battery-Lasting-Count/dp/B07GN8ZYZR/ref=sr_1_5?keywords=DS3231%2Bbattery&qid=1707239400&sr=8-5&th=1',
      costaliexpress: '$0.45',
      aliexpress: 'https://aliexpress.ru/item/32988731803.html?spm=a2g2w.detail.similar_rcmd.3.52fe93535zizhd&mixer_rcmd_bucket_id=aerabtestalgoRecommendAbV2_controlRu2&pdp_trigger_item_id=0_32979929330&ru_algo_pv_id=c6a62b-61b690-c660a9-2925e0-1724151600&scenario=aerSimilarItemPdpRcmd&sku_id=66784927365&traffic_source=recommendation&type_rcmd=core',
      image: getImage('battery.png')
    },
    {
      name: t('diy.materials.item.24'),
      quantity: 1,
      description: t('diy.materials.desc.24'),
      costamazon: '$9.95',
      amazon: 'https://www.amazon.com/CanaKit-Raspberry-Supply-Adapter-Listed/dp/B00MARDJZ4',
      costaliexpress: '$1.63',
      aliexpress: 'https://aliexpress.ru/item/4000153292998.html?sku_id=10000000475945344&spm=a2g2w.productlist.search_results.6.5fa25fc1wbcIE5',
      image: getImage('power.png')
    },
  ];

  return (
    <div id="materials" className={`container mb-2 col-md-8 col-12 ${styles.bomContainer}`}>
      <h2 className={styles.title}>{t('diy.tabs.mattitle')}</h2>

      <div className={styles.section}>
        <table className={styles.table}>
          <thead>
            <tr>
            <th>{t('diy.tools.item')}</th>
              <th>{t('diy.materials.qnt')}</th>
              <th>{t('diy.materials.info')}</th>
              <th>Amazon</th>
              <th>{t('diy.materials.cost')}</th>
              <th>AliExpress</th>
              <th>{t('diy.materials.cost')}</th>
              <th>{t('diy.tools.image')}</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index}>
                <td data-label={t('diy.tools.item')}>{material.name}</td>
                <td data-label={t('diy.materials.qnt')}>{material.quantity}</td>
                <td className={styles.info} data-label={t('diy.materials.info')}>{material.description}</td>
                <td data-label="Amazon">
                {material.amazon ? (
                    <a href={material.amazon} target="_blank" rel="noopener noreferrer">Amazon</a>
                  ) : (
                    ''
                  )}
                </td>
                <td data-label={t('diy.materials.cost')}>{material.costamazon || ''}</td>
                <td data-label="AliExpress">
                  {Array.isArray(material.aliexpress) && material.aliexpress.length > 0 ? (
                    material.aliexpress.map((link, i) => (
                      <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                        AliExpress{i + 1} <br/>
                      </a>
                    ))
                  ) : material.aliexpress ? (
                    <a href={material.aliexpress} target="_blank" rel="noopener noreferrer">
                      AliExpress
                    </a>
                  ) : (
                    ''
                  )}
                </td>
                <td data-label={t('diy.materials.cost')}>{material.costaliexpress || ''}</td>
                <td data-label={t('diy.tools.item')}><img src={material.image} alt={material.name} className={styles.image} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Materials;
