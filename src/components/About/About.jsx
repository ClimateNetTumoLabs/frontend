import React from "react";
import styles from "./About.module.css";
import CollapsibleText from "../CollapsibleText/CollapsibleText";
import temp from "../../assets/AboutIcons/temperature.webp"
import hum from "../../assets/AboutIcons/humidity.webp"
import pressure from "../../assets/AboutIcons/pressure.webp"
import pm_1 from "../../assets/AboutIcons/lungs.webp"
import pm_2 from "../../assets/AboutIcons/pm2.webp"
import pm_10 from "../../assets/AboutIcons/dust.webp"
import anemometer from "../../assets/AboutIcons/anemometer.webp"
import arrow from "../../assets/AboutIcons/arrow.webp"
import uv_a from "../../assets/AboutIcons/uva.webp"
import lux from "../../assets/AboutIcons/lux.png"
import rain from "../../assets/AboutIcons/rain.png"
import {useTranslation} from "react-i18next";
import "../../i18n";

const About = () => {
    const {t} = useTranslation();
    const temperatureContent = `
    <div class="mt-4">
        <h2 class=${styles.measure_title}>${t('about.measureTemp')}</h2>
        <div class="d-flex align-items-center">
            <img loading="lazy" class=${styles.icon} src=${temp} alt="Temperature"/>
            <span class="text-light d-flex align-content-center">
                ${t('about.temperatureContent')}<br>
                ${t('about.temperatureContent2')}
            </span> 
        </div>
    </div>
`;

    const humidityContent = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.measureHumidity')}</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${hum} alt="Humidity"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.humidityContent')}<br>
                    ${t('about.humidityContent2')}
                </span> 
            </div>
        </div>
    `

    const pressureContent = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.measurePressure')}</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${pressure} alt="Pressure"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.pressureContent')} <br/>
                    ${t('about.pressureContent2')}
                </span> 
            </div>
        </div>
    `
    const air_quality_intro = `
        <div class="mt-4">
            <span class="text-light d-flex align-content-center">
                ${t('about.airQualityIntro')}<br/>
                ${t('about.airQualityIntro2')}<br/> 
                ${t('about.airQualityIntro3')}
            </span> 
        </div>
    `

    const pm1 = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 1.0</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${pm_1} alt="PM1.0"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.pm1')}<br/>
                    ${t('about.pm1_2')}<br/>
                    ${t('about.pm1_3')}<br/>               
                </span> 
            </div>
        </div>
    `
    const pm2 = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 2.5</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${pm_2} alt="PM2.5"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.pm2')}<br/>
                    ${t('about.pm2_2')}<br/>
                    ${t('about.pm2_3')}<br/> 
                </span> 
            </div>
        </div>
    `
    const pm10 = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 10.0</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${pm_10} alt="PM2.5"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.pm10')}<br/>
                    ${t('about.pm10_2')}<br/>
                    ${t('about.pm10_3')}<br/> 
                </span> 
            </div>
        </div>
    `
    const table = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.pmDanger')}</h2>
            <div class=${styles.table_block}>
                <table>
                  <thead>
                    <tr>
                      <th>${t('about.pmTh1')}</th>
                      <th>${t('about.pmTh2')}</th>
                      <th>${t('about.pmTh3')}</th>
                      <th>${t('about.pmTh4')}</th>
                      <th>${t('about.pmTh5')}</th>
                      <th>${t('about.pmTh6')}</th>
                      <th>${t('about.pmTh7')}</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr>
                      <td>PM1.0 ${t('about.pmMu')}</td>
                      <td>0</td>
                      <td>50</td>
                      <td>100</td>
                      <td>150</td>
                      <td>200</td>
                      <td>300</td>
                    </tr>
                    <tr>
                      <td>PM2.5 ${t('about.pmMu')}</td>
                      <td>0</td>
                      <td>12</td>
                      <td>35.5</td>
                      <td>55.5</td>
                      <td>150.5</td>
                      <td>250.5</td>
                    </tr>
                    <tr>
                      <td>PM10 ${t('about.pmMu')}</td>
                      <td>0</td>
                      <td>54</td>
                      <td>154</td>
                      <td>254</td>
                      <td>354</td>
                      <td>504</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
 
    `

    const windSpeed = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.titleWindSpeed')}</h2>
            <div class="d-flex align-items-center">
                <img  loading="lazy" class=${styles.icon} src=${anemometer} alt="Anemometer"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.windSpeed')}<br/>
                    ${t('about.windSpeed2')}
                </span> 
            </div>
        </div>
    `
    const windDirection = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.titleWindDirection')}</h2>
            <div class="d-flex align-items-center">
                <img  loading="lazy" class=${styles.icon} src=${arrow} alt="Direction"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.windDirection')}<br/>
                    ${t('about.windDirection2')}     
                </span> 
            </div>
        </div>
    `
    const rainSensor = `
    <div class="mt-4">
        <h2 class=${styles.measure_title} >${t('about.titleRain')}</h2>
        <div class="d-flex align-items-center">
            <img loading="lazy" class=${styles.icon} src=${rain} alt="rain"/>
            <span class="text-light d-flex align-content-center">
                ${t('about.rain1')}<br/>
                ${t('about.rain2')}<br/>
            </span> 
        </div>
    </div>
`
    const uv_intro = `
        <div class="mt-4">
            <span class="text-light d-flex align-items-center">
                ${t('about.uv_intro')}<br/>
            </span> 
        </div>
    `

    const api_info = `
        <p>${t('about.api_info')}</p>

        <h2 class=${styles.measure_title}>API Endpoint:</h2>
        <pre>https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData</pre>

        <h2 class=${styles.measure_title}>${t('about.api_info_param')}</h2>
        <ul>
            <li><strong>device_id</strong> ${t('about.api_info_deviceId')}</li>
            <li><strong>start_time</strong>${t('about.api_info_startTime')} (${t('about.api_info_format')} <code>YYYY-MM-DD</code>).</li>
            <li><strong>end_time</strong> ${t('about.api_info_endTime')} (${t('about.api_info_format')} <code>YYYY-MM-DD</code>).</li>
        </ul>

        <h2 class=${styles.measure_title}>${t('about.api_info_example')}</h2>
        <div class=${styles.examples}>
            <pre>GET <a class=${styles.link} target="_blank" href="https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=8&amp;start_time=2023-11-10&amp;end_time=2024-1-8">https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=8&amp;start_time=2023-11-10&amp;end_time=2024-1-8</a></pre>
            
            <h3 class=${styles.sub_title_3}>${t('about.api_info_24')}</h3>
            <p>${t('about.api_info_24_request')} <code>start_time</code> ${t('about.and')} <code>end_time</code>, ${t('about.api_info_24_request2')}</p>
            <pre><a class=${styles.link} target="_blank" href="https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=8">https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=3</a></pre>

            <h3 class=${styles.sub_title_3} >${t('about.api_info_response')}</h3>
            <p>${t('about.api_info_json')}</p>
        
        </div>

        <h2 class=${styles.measure_title}>${t('about.api_info_usage')}</h2>
        <ul>
            <li>${t('about.api_info_usage2')} (<code>https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData</code>)${t('about.api_info_usage3')}(<code>device_id</code>, <code>start_time</code>, <code>end_time</code>).</li>
            <li>${t('about.api_info_usage4')}</li>
            <li>${t('about.api_info_usage5')}</li>
        </ul>

        <p><strong>${t('about.api_info_note')}</strong> ${t('about.api_info_note2')}</p>

        <p>${t('about.api_info_note3')}<a class=${styles.link} href="mailto:eutumocc@tumo.org">eutumocc@tumo.org</a>.</p>
        <h2 class=${styles.measure_title}>${t('about.api_info_note4')} <code>&lt;source&gt;${t('about.api_info_note5')}&lt;/source&gt;</code></h2>
        <p>${t('about.api_info_done')}</p>
    `

    const uva = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >UV</h2>
            <div class="d-flex align-items-center ">
                <img loading="lazy" class=${styles.icon} src=${uv_a} alt="UV"/>
                <span class="text-light d-flex align-content-center">
                    ${t('about.uva')}<br/>
                    ${t('about.uva2')}<br/>
                    ${t('about.uva3')}<br/>               
                </span> 
            </div>
        </div>
    `

    const tableUV = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.tableuv')}</h2>
            <div class=${styles.table_block}>
                <table>
                  <thead>
                    <tr>
                      <th>${t('about.uvth1')}</th>
                      <th>${t('about.uvth2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr>
                      <td>${t('about.uvlow')}</td>
                      <td>< 2</td>
                    </tr>
                    <tr>
                      <td>${t('about.uvmoderate')}</td>
                      <td>3-5</td>
                    </tr>
                    <tr>
                      <td>${t('about.uvhigh')}</td>
                      <td>6-7</td>
                    </tr>
                    <tr>
                    <td>${t('about.uvveryhigh')}</td>
                    <td>8-10</td>
                </tr>
                    <tr>
                    <td>${t('about.uvextreme')}</td>
                    <td>11+</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
 
    `
    const luxContent = `
    <div class="mt-4">
        <h2 class=${styles.measure_title} >${t('about.lux')}</h2>
        <div class="d-flex align-items-center ">
            <img loading="lazy" class=${styles.icon} src=${lux} alt="LUX"/>
            <span class="text-light d-flex align-content-center">
                ${t('about.lux1')}<br/>
                ${t('about.lux2')}<br/>
                ${t('about.lux3')}<br/>               
            </span> 
        </div>
    </div>
`

    return (
        <div className={styles.about_us_page}>
            <div className={`${styles.about_section} ${styles.ab_1}`}><span
                className={styles.welcome_to}>{t('about.welcome')}</span>
                {t('about.section1')}
            </div>
            <div className={`${styles.about_section} ${styles.ab_2}`}>{t('about.section2')}
            </div>
            <div className={`${styles.about_section} ${styles.ab_3}`}>{t('about.section3')} <a
                className={styles.link} href={"https://tumolabs.am/en/"}>{t('about.section4')}</a> {t('about.section5')}
                <a
                    className={styles.link}
                    href={"https://42yerevan.am/"}>{t('about.section6')}</a> {t('about.section7')}
            </div>

            <div className={styles.measurement_description}>
                <CollapsibleText text={temperatureContent + humidityContent + pressureContent}
                                 point={t('about.titleTemp')}/>
                <CollapsibleText text={air_quality_intro + pm1 + pm2 + pm10 + table} point={t('about.titleAir')}/>
                <CollapsibleText text={windSpeed + windDirection + rainSensor} point={t('about.titleWind')}/>
                <CollapsibleText text={uv_intro + luxContent + uva + tableUV } point={t('about.titleUv')}/>
            </div>

            <div className={styles.API_section}>
                <CollapsibleText text={api_info} point={t('about.titleWeather')}/>
            </div>
        </div>
    );
};

export default About;
