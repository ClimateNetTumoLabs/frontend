import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import styles from "./Description.module.css";

import aws from '../../assets/Logo/aws.png'
import tumo from '../../assets/Logo/tumo.png'
import Team from "../Team/Team";

const Description = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <div className="container-fluid mb-3">
            <div className={styles.about_us_section}>
                <div data-aos="fade-up" className={`${styles.boxes}`}>
                    <h2 className={styles.title}>Climate Friends:</h2>
                    <p className={"mb-3"}>Meet our partners and friends who have supported us and continue to do so. </p>
                    <div className={`d-flex mb-3`}>
                        <p className={`${styles.partners} ${styles.partner_link}`}>
                            <a href='https://aws.amazon.com/' >
                                <img loading="lazy" className={`${styles.partner_logo}`} src={aws} alt={"AWS Logo"}/>
                            </a>
                        </p>
                        <p>The Amazon Web Services provides us with cloud credits to help us store and manage our data with high standards.</p>
                    </div>
                    <div className={`d-flex `}>
                        <p className={`${styles.partners} ${styles.partner_link}`}>
                            <a href='https://armenia.tumo.org/'>
                                <img  loading="lazy" className={`${styles.partner_logo}`} src={tumo} alt={"TUMO Logo"}/>
                            </a>
                        </p>
                        <p>
                            TUMO Boxes are low-cost and easy-to-deploy facilities built out of shipping containers. Strategically placed so that every teen in Armenia can reach one in 40 minutes or less, these self-contained learning environments are equipped with state-of-the-art workstations and equipment and can host up to 320 students per week.  The boxes provide access to the TUMO program and the entire network of coaches. These satellite locations act as the foundation for the ClimateNet devices. The devices are deployed on these boxes across the country to provide us with the local and accurate data.workshop leaders, and fellow students.
                        </p>
                    </div>
                </div>
                <div data-aos="fade-up" className={`${styles.boxes}`}>
                    <h2 className={styles.title}>Student Contributors:</h2>
                    <p>
                        Meet TUMO Labs’ interns during the course of the project. The project calls for new additional members every 6 months. After an intensive 3 months of theoretical & practical workshops the top students will be selected to join the final stage as an intern. During the internship the students will be helping to build, install, and monitor the device
                    </p>
                    <Team/>
                </div>
            </div>
        </div>
    );
};

export default Description;
