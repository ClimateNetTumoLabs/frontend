import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles['about-us']}>
            <h2>About Tumo Labs Armenia</h2>
            <p>Welcome to Tumo Labs Armenia, where innovation knows no bounds.</p>

            <h3>Our Mission</h3>
            <p>
                At Tumo Labs, we are driven by a singular mission: to foster a culture
                of creativity, innovation, and technological advancement in Armenia and
                beyond. We believe in the power of collaboration, curiosity, and
                cutting-edge technology to shape the future.
            </p>

            <h3>Who We Are</h3>
            <p>
                Tumo Labs Armenia is a dynamic community of forward-thinkers, inventors,
                and creators dedicated to pushing the boundaries of what's possible. We
                bring together a diverse team of experts in various fields, from
                artificial intelligence to renewable energy, all united by a passion for
                innovation.
            </p>

            <h3>What We Do</h3>
            <ul>
                <li>
                    <strong>Innovation Hub</strong>: Our state-of-the-art Innovation Hub
                    is the heartbeat of Tumo Labs.
                </li>
                <li>
                    <strong>Cutting-Edge Research</strong>: Research is at the core of
                    everything we do. Our teams delve into a wide array of fields, from
                    data science to sustainable technologies, aiming to make a meaningful
                    impact on industries and communities.
                </li>
                <li>
                    <strong>Technology Accelerator</strong>: We provide a nurturing
                    environment for startups and emerging tech companies. Through
                    mentorship, resources, and access to a global network, we accelerate
                    the growth of promising ventures.
                </li>
                <li>
                    <strong>Education & Training</strong>: We believe in equipping the
                    next generation with the skills they need to shape the future. Our
                    programs and workshops empower young minds to explore, create, and
                    innovate.
                </li>
            </ul>

            <p>
                Since our inception, Tumo Labs Armenia has been at the forefront of
                numerous groundbreaking projects. From developing cutting-edge software
                to pioneering sustainable technologies, we're making a tangible
                difference in the world.
            </p>

            <h3>Collaborate With Us</h3>
            <p>
                Whether you're a seasoned expert, a budding entrepreneur, or a curious
                learner, there's a place for you at Tumo Labs. Join us in our mission to
                revolutionize industries, foster innovation, and create a brighter
                future for Armenia and the world.
            </p>

            <h3>Contact Us</h3>
            <p>
                Ready to embark on a journey of innovation? Get in touch with us today:
            </p>
            <ul className={styles['contact-list']}>
                <li>
                    <strong>Address:</strong> [Include Address]
                </li>
                <li>
                    <strong>Email:</strong> [Include Email]
                </li>
                <li>
                    <strong>Phone:</strong> [Include Phone Number]
                </li>
                <li>
                    <strong>Social Media:</strong> [Include Social Media Links]
                </li>
            </ul>

            <p>
                Welcome to Tumo Labs Armenia, where the future is forged today!
            </p>
        </div>
    );
}

export default AboutUs;
