import React from "react";
import styles from  "./About.module.css";
import CollapsibleText from "../CollapsibleText/CollapsibleText";
import temp from "../../assets/about_icons/temperature.png"
import hum from "../../assets/about_icons/humidity.png"
import pressure from "../../assets/about_icons/pressure.png"
import pm_1 from "../../assets/about_icons/lungs.png"
import pm_2 from "../../assets/about_icons/pm2.png"
import pm_10 from "../../assets/about_icons/dust.png"
import anemometer from "../../assets/about_icons/anemometer.png"
import arrow from "../../assets/about_icons/arrow.png"
import uv_a from "../../assets/about_icons/uva.png"
import uv_b from "../../assets/about_icons/uv.png"


const About = () => {
    const temperatureContent = `
        <div class="mt-4">
            <h2 class=${styles.measure_title}>Measuring Temperature</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${temp} alt="Temperature"/>
                <span class="text-light d-flex align-content-center">
                    The temperatures measuring ranging from -40°C to 85°C.<br/>
                    Over the temperature range of 0 to 65°C, the accuracy is ±1.0°C; outside of that range, the accuracy drops to ±1.5°C.</span> 
            </div>
        </div>
    `
    const humidityContent= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >Measuring Humidity</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${hum} alt="Humidity"/>
                <span class="text-light d-flex align-content-center">
                    The relative humidity measured of the  over a range of 0 to 100% with an accuracy of ±3%.<br/>
                    According to the datasheet, the sensor can measure up to 100% humidity over a temperature range of 0 to 60°C. However, the maximum measurable humidity decreases at extremely high and low temperature
                </span> 
            </div>
        </div>
    `

    const pressureContent= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >Measuring Pressure</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${pressure} alt="Pressure"/>
                <span class="text-light d-flex align-content-center">
                    The pressure measured between 300Pa to 1100 hPa with an absolute accuracy of ±1 hPa. <br/>
                    Over the temperature range of 0 to 65°C, full accuracy is obtained, resulting in an altitude measurement accuracy of approximately ±1 meter. Outside of that range, the accuracy drops to 1.7 hPa.
                </span> 
            </div>
        </div>
    `
    const air_quality_intro= `
        <div class="mt-4">
            <span class="text-light d-flex align-content-center">
                The high-precision particulate matter (PM) sensor with a sensitivity of 50% for 0.3 μm particles and 98% for 0.5 μm and larger particles. <br/>
                It provides a resolution of 1 μg/m³ and operates in temperatures ranging from -10 °C to 60 °C. <br/> 
                The sensor is designed to work effectively in humidity levels from 0% to 99%, making it suitable for diverse environmental conditions.
            </span> 
        </div>
    `

    const pm1= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 1.0</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${pm_1} alt="PM1.0"/>
                <span class="text-light d-flex align-content-center">
                    These particles are so small they can bypass the body's natural defenses and penetrate deep into the lungs and bloodstream. <br/>
                    They can cause respiratory problems, heart disease, and even cancer.<br/>
                    Children and people with existing respiratory conditions are particularly vulnerable to the harmful effects of PM1.0.<br/>               
                </span> 
            </div>
        </div>
    `
    const pm2= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 2.5</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${pm_2} alt="PM2.5"/>
                <span class="text-light d-flex align-content-center">
                    These particles are also small enough to cause respiratory problems, but their larger size prevents them from reaching the deepest parts of the lungs. <br/>
                    However, they can still irritate the airways and trigger asthma attacks.<br/>
                    PM2.5 exposure has also been linked to an increased risk of cardiovascular disease.<br/>
                </span> 
            </div>
        </div>
    `
    const pm10= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM 10.0</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${pm_10} alt="PM2.5"/>
                <span class="text-light d-flex align-content-center">
                    These particles are larger and less likely to be inhaled deeply. <br/>
                    However, they can still irritate the eyes, nose, and throat.<br/>
                    Long-term exposure to PM10 can also lead to respiratory problems and heart disease.<br/>
                </span> 
            </div>
        </div>
    `
    const table = `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >PM Sensor Danger Values</h2>
            <div class=${styles.table_block}>
                <table>
                  <thead>
                    <tr>
                      <th>Pollutant</th>
                      <th>Good</th>
                      <th>Moderate</th>
                      <th>Unhealthy for Sensitive Groups</th>
                      <th>Unhealthy</th>
                      <th>Very Unhealthy</th>
                      <th>Hazardous</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr>
                      <td>PM1.0 (μg/m³)</td>
                      <td>0</td>
                      <td>50</td>
                      <td>100</td>
                      <td>150</td>
                      <td>200</td>
                      <td>300</td>
                    </tr>
                    <tr>
                      <td>PM2.5 (μg/m³)</td>
                      <td>0</td>
                      <td>12</td>
                      <td>35.5</td>
                      <td>55.5</td>
                      <td>150.5</td>
                      <td>250.5</td>
                    </tr>
                    <tr>
                      <td>PM10 (μg/m³)</td>
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

    const windSpeed= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >Wind Speed</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${anemometer} alt="Anemometer"/>
                <span class="text-light d-flex align-content-center">
                    A rotating cup anemometer with magnets passes by a stationary reed switch. As the wind blows faster, the cup spins faster, triggering the reed switch more frequently, allowing the system to calculate wind speed.<br/>
                    Sensor can measure wind speeds from 0.4 m/s to 45 m/s.
                </span> 
            </div>
        </div>
    `
    const windDirection= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >Wind Direction</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${arrow} alt="Direction"/>
                <span class="text-light d-flex align-content-center">
                    A wind vane with a magnet rotates based on the wind direction. This triggers different reed switches positioned around the vane, allowing the system to determine the wind direction.<br/>
                    The rain sensor can register rainfall amounts as small as 0.2794 mm (0.011 inches) per tip.      
                </span> 
            </div>
        </div>
    `

    const uv_intro= `
        <div class="mt-4">
            <span class="text-light d-flex align-items-center">
                We measuring light intensity and spectral information, making it valuable for various applications.  <br/>
                UVA and UVB are two types of ultraviolet (UV) radiation emitted by the sun, but they differ in their wavelength and impact on human health. Here's an in-depth look at each: <br/> 
            </span> 
        </div>
    `

    const uva= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >UVA</h2>
            <div class="d-flex align-items-center ">
                <img class=${styles.icon} src=${uv_a} alt="UVA"/>
                <span class="text-light d-flex align-content-center">
                    Wavelength 315-400nm <br/>
                    UVA rays are the longest-wavelength UV radiation reaching Earth's surface. They penetrate deep into the skin, reaching the dermis layer<br/>
                    While UVA is less energetic than UVB, it contributes significantly to skin aging and wrinkles. It can also weaken the immune system and increase the risk of skin cancer<br/>               
                </span> 
            </div>
        </div>
    `

    const uvb= `
        <div class="mt-4">
            <h2 class=${styles.measure_title} >UVB</h2>
            <div class="d-flex align-items-center">
                <img class=${styles.icon} src=${uv_b} alt="UVB"/>
                <span class="text-light d-flex align-content-center">
                    Wavelength 315-400nm <br/>
                    UVA rays are the longest-wavelength UV radiation reaching Earth's surface. They penetrate deep into the skin, reaching the dermis layer<br/>
                    While UVA is less energetic than UVB, it contributes significantly to skin aging and wrinkles. It can also weaken the immune system and increase the risk of skin cancer<br/>               
                </span> 
            </div>
        </div>
    `


    return (
        <div className={styles.about_us_page}>
            <div className={`${styles.about_section} ${styles.ab_1}`}><span className={styles.welcome_to}>Welcome to The Climate Net,</span> a
                pioneering hyper-local, student-led climate observatory. Our mission is to empower the next generation
                and raise awareness through real-time data tracking, all while making a significant contribution to
                mitigating climate change. We're dedicated to advocating for climate action beyond borders, because the
                challenges we face are global in nature.
            </div>
            <div className={`${styles.about_section} ${styles.ab_2}`}>At The Climate Net, we believe in the power of
                youth to drive meaningful change. We're putting the future in the hands of those who will be most
                affected by it: the young citizens inheriting the consequences of choices made by previous generations.
                We're here to equip and inspire them to take charge of tracking climate change patterns that will have
                the most significant impact on their lives and the world they'll inherit.
            </div>
            <div className={`${styles.about_section} ${styles.ab_3}`}>The Climate Net project is empowered by <a
                className={styles.link} href={"https://tumolabs.am/en/"}>TUMO Labs.</a> TUMO Labs is a tuition-free
                education program based on the just-in-time methodology that connects higher-education with industry.
                Anyone over the age of 18 can participate in the program designed specifically for TUMO Labs.The TUMO
                Labs education program consists of guided self-learning, project-based learning, Tech Incubation, and <a
                    className={styles.link} href={"https://42yerevan.am/"}>42 Yerevan</a> programming school. These
                multi complementary methods enable students to acquire knowledge and practical skills in the fields of
                technology, applied science, and engineering. As a result, it equips students with the competitive
                skills needed to succeed in a globally connected job market and economy.
            </div>

            <div className={styles.measurement_description}>
                <CollapsibleText text={temperatureContent + humidityContent + pressureContent} point={"Temperature, Humidity and Pressure"}/>
                <CollapsibleText text={air_quality_intro + pm1 + pm2 + pm10 + table} point={"Air Quality"}/>
                <CollapsibleText text={windSpeed + windDirection} point={"Air Speed, Direction and Rain"}/>
                <CollapsibleText text={uv_intro + uva + uvb} point={"UV index"}/>
            </div>


        </div>
    );
};

export default About;
