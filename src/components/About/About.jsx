import React from "react";
import styles from  "./About.module.css";
import CollapsibleText from "../CollapsibleText/CollapsibleText";

const About = () => {
    const temperatureContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n";

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
                <CollapsibleText text={temperatureContent} point={"Temperature, Humidity and Pressure"}/>
                <CollapsibleText text={temperatureContent} point={"Air Quality"}/>
                <CollapsibleText text={temperatureContent} point={"Air Speed, Direction and Rain"}/>
                <CollapsibleText text={temperatureContent} point={"UV index"}/>
            </div>


        </div>
    );
};

export default About;
