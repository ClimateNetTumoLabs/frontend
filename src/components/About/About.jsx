import styles from "./About.module.css";
import CollapsibleText from "../CollapsibleText/CollapsibleText";
import {useTranslation} from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "../../i18n";

const About = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const weatherRef = useRef(null);
    const airQualityRef = useRef(null);
    const windRef = useRef(null);
    const uvRef = useRef(null);
    const apiRef = useRef(null);
    const [highlightedSection, setHighlightedSection] = useState(null);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            const ref = {
                temperature: weatherRef,
                humidity: weatherRef,
                pressure: weatherRef,
                rain: windRef,
                pm1: airQualityRef,
                pm2_5: airQualityRef,
                pm10: airQualityRef,
                pm: airQualityRef,
                wind: windRef,
                uv: uvRef,
                lux: uvRef,
                api: apiRef
            }[hash];

            if (ref && ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' });

                const section = ref.current.querySelector(".collapsible-content");
                const isCollapsed = section && section.style.display === 'none';

                if (isCollapsed) {
                    ref.current.click();
                }

                setHighlightedSection(hash);
                setTimeout(() => setHighlightedSection(null), 3500);
            }
        }
    }, [location]);

useEffect(() => {
    if (highlightedSection) {
        const element = document.getElementById(highlightedSection);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );

                if (!isVisible) {
                    window.scrollBy({ top: rect.top - 20, behavior: 'smooth' });
                }

                element.classList.add(styles.highlighted);

                setTimeout(() => {
                    element.classList.remove(styles.highlighted);
                    setHighlightedSection(null);
                }, 3500);
            }, 300);
        }
    }
}, [highlightedSection]);

    const temperatureContent = `
    <div id="temperature" >
        <p>${t('about.thpIntro')}</p>
        <h2 class=${styles.measure_title}>${t('about.measureTemp')}</h2>
        <div class="d-flex align-items-center">
            <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/temperature.png"} alt="Temperature"/>
            <span class="d-flex align-content-center">
                ${t('about.temperatureContent')}<br>
                ${t('about.temperatureContent2')}<br>
            </span> 
        </div>
    </div>
`;

    const humidityContent = `
        <div id="humidity" class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.measureHumidity')}</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/humidity.png"} alt="Humidity"/>
                <span class=" d-flex align-content-center">
                    ${t('about.humidityContent')}<br>
                    ${t('about.humidityContent2')}
                </span> 
            </div>
        </div>
    `

    const pressureContent = `
        <div id="pressure" class="mt-4 mb-3">
            <h2 class=${styles.measure_title} >${t('about.measurePressure')}</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/pressure.png"} alt="Pressure"/>
                <span class="d-flex align-content-center">
                    ${t('about.pressureContent')} <br/>
                    ${t('about.pressureContent2')}
                </span> 
            </div>
        </div>
    `
    const air_quality_intro = `
        <div id="airquality" >
            <span class="d-flex align-content-center">
                ${t('about.airQualityIntro')}<br/>
                ${t('about.airQualityIntro2')}<br/> 
                ${t('about.airQualityIntro3')}
            </span> 
        </div>
    `

    const pm1 = `
        <div id="pm1" class="mt-4">
            <h2 class=${styles.measure_title} >PM 1.0</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/lungs.png"} alt="PM1.0"/>
                <span class="d-flex align-content-center">
                    ${t('about.pm1')}<br/>
                    ${t('about.pm1_2')}<br/>
                    ${t('about.pm1_3')}<br/>               
                </span> 
            </div>
        </div>
    `
    const pm2 = `
        <div id="pm2_5" class="mt-4">
            <h2 class=${styles.measure_title} >PM 2.5</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/pm2.png"} alt="PM2.5"/>
                <span class="d-flex align-content-center">
                    ${t('about.pm2')}<br/>
                    ${t('about.pm2_2')}<br/>
                    ${t('about.pm2_3')}<br/> 
                </span> 
            </div>
        </div>
    `
    const pm10 = `
        <div id="pm10" class="mt-4">
            <h2 class=${styles.measure_title} >PM 10.0</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/dust.png"} alt="PM2.5"/>
                <span class=" d-flex align-content-center">
                    ${t('about.pm10')}<br/>
                    ${t('about.pm10_2')}<br/>
                    ${t('about.pm10_3')}<br/> 
                </span> 
            </div>
        </div>
    `
    const table = `
        <div id="pm" class="mt-4">
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
                      <td>36</td>
                      <td>56</td>
                      <td>151</td>
                      <td>251</td>
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
        <div id="wind">
            <h2 class=${styles.measure_title} >${t('about.titleWindSpeed')}</h2>
            <div class="d-flex align-items-center">
                <img  loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/anemometer.png"} alt="Anemometer"/>
                <span class=" d-flex align-content-center">
                    ${t('about.windSpeed')}<br/>
                    ${t('about.windSpeed2')}
                </span> 
            </div>
        </div>
    `
    const windDirection = `
        <div id="direction" class="mt-4">
            <h2 class=${styles.measure_title} >${t('about.titleWindDirection')}</h2>
            <div class="d-flex align-items-center">
                <img  loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/arrow.png"} alt="Direction"/>
                <span class=" d-flex align-content-center">
                    ${t('about.windDirection')}<br/>
                    ${t('about.windDirection2')}
                </span> 
            </div>
        </div>
    `
    const rainSensor = `
    <div id="rain" class="mt-4">
        <h2 class=${styles.measure_title} >${t('about.titleRain')}</h2>
        <div class="d-flex align-items-center">
            <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/rain.png"} alt="rain"/>
            <span class="d-flex align-content-center">
                ${t('about.rain1')}<br/>
                ${t('about.rain2')}<br/>
            </span>
        </div>
        <div  class="mt-4">
            <div class=${styles.table_block}>
                <table>
                    <thead>
                        <tr>
                            <th>${t('about.rain.rainfall')}</th>
                            <th>${t('about.rain.intensity')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${t('about.rain.table.light')}</td>
                            <td>< 2.5 </td>
                        </tr>
                        <tr>
                            <td>${t('about.rain.table.moderate')}</td>
                            <td>2.5-7.5 </td>
                        </tr>
                        <tr>
                            <td>${t('about.rain.table.heavy')}</td>
                            <td>7.5-15 </td>
                        </tr>
                        <tr>
                            <td>${t('about.rain.table.intense')}</td>
                            <td>15-30 </td>
                        </tr>
                        <tr>
                            <td>${t('about.rain.table.torrential')}</td>
                            <td>> 30 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
`
    const uv_intro = `
        <div>
            <span class="d-flex align-items-center">
                ${t('about.uv_intro')}<br/>
                ${t('about.uv_intro2')}
            </span> 
        </div>
    `
const combinedUV = `
    <div id="uv" class="mt-4">
        <div>
            <h2 class=${styles.measure_title}>${t('about.tableuv')}</h2>
            <div class="d-flex align-items-center">
                <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/uv.png"} alt="UV"/>
                <span class="d-flex align-content-center">
                    ${t('about.uva')}<br/>
                    ${t('about.uva2')}<br/>
                </span>
            </div>
        </div>
        <div class="mt-4">
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
    </div>
`;
    const luxContent = `
    <div id="lux" class="mt-4">
        <h2 class=${styles.measure_title} >${t('about.lux')}</h2>
        <div class="d-flex align-items-center ">
            <img loading="lazy" class=${styles.icon} src=${"https://images-in-website.s3.us-east-1.amazonaws.com/AboutIcons/lux.png"} alt="LUX"/>
            <span class="d-flex align-content-center">
                ${t('about.lux1')}<br/>
                ${t('about.lux2')}<br/>
                ${t('about.lux3')}<br/>
            </span>
        </div>
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
            <pre><a class=${styles.link} target="_blank" href="https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=1">https://emvnh9buoh.execute-api.us-east-1.amazonaws.com/getData?device_id=1</a></pre>

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

        <p>${t('about.api_info_note3')}<a class=${styles.link} href="mailto:labs@tumo.org">labs@tumo.org</a>.</p>
        <h2 class=${styles.measure_title}>${t('about.api_info_note4')} <code>&lt;source&gt;${t('about.api_info_note5')}&lt;/source&gt;</code></h2>
        <p>${t('about.api_info_done')}</p>
    `

    return (

        <div className={styles.about_us_page}>
             <Helmet>
                <title>ClimateNet | A Student-led Climate Initiative</title>
             </Helmet>
            <div className={`${styles.about_section} ${styles.ab_1}`}><span
                className={styles.welcome_to}>{t('about.welcome')}</span>
                {t('about.section1')}
            </div>
            <div className={`${styles.about_section} ${styles.ab_2}`}>{t('about.section2')}
            </div>
            <div className={`${styles.about_section} ${styles.ab_3}`}>{t('about.section3')} <a
                className={styles.link} href={"https://tumolabs.am/en/"}>{t('about.section4')}</a> {t('about.section5')}
            </div>
            <div className={`${styles.about_section} ${styles.ab_2}`}>{t('about.section8')}
                <br/><br/>{t('about.section9')}
            </div>

            <div className={styles.measurement_description}>
                <CollapsibleText
                ref={weatherRef}
                text={temperatureContent + humidityContent + pressureContent}
                point={t('about.titleTemp')}/>

                <CollapsibleText
                ref={airQualityRef}
                text={air_quality_intro + pm1 + pm2 + pm10 + table}
                point={t('about.titleAir')}/>

                <CollapsibleText
                ref={windRef}
                text={windSpeed + windDirection + rainSensor}
                point={t('about.titleWind')}/>

                <CollapsibleText
                ref={uvRef}
                text={uv_intro + luxContent + combinedUV }
                point={t('about.titleUv')}/>
            </div>

            <div className={styles.API_section}>
                <CollapsibleText
                ref={apiRef}
                text={api_info}
                point={t('about.titleWeather')}/>
            </div>
        </div>
    );
};

export default About;
