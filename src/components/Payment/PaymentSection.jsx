import React, {useEffect, useState} from "react";
import styles from "./Payment.module.css";
import PaymentButton from "./Payment";
import ReactCardFlip from "react-card-flip";
import CheckoutAndDelivery from "../CheckoutAndDelivery/CheckoutAndDelivery";
import AOS from "aos";
import "aos/dist/aos.css";

const BenefitCard = ({ icon, title, description }) => {
    return (
        <div className={styles.benefit_card}>
            <div className={styles.icon_container}>{icon}</div>
            <h4 className={styles.benefit_title}>{title}</h4>
            <p className={styles.benefit_description}>{description}</p>
        </div>
    );
};

const PaymentSection = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    const device = {
        imageUrl: "https://images-in-website.s3.us-east-1.amazonaws.com/Weather/device.svg",
        description: "ClimateNet devices are advanced IoT climate monitoring tools designed to provide real-time environmental data. These devices collect crucial weather metrics such as temperature, humidity, UV levels, and air quality, enabling informed decision-making for businesses, agriculture, and local authorities. Ideal for anyone looking to enhance their climate monitoring capabilities with reliable and accurate data.",
        price: "$399.99",
    };

    const benefits = [
        {
            icon: '☁️', // Replace with an actual icon or image
            title: 'Unlimited Data Storage',
            description: 'Secure and unlimited storage for all your climate data.',
        },
        {
            icon: '🛠️',
            title: 'Experts Support',
            description: 'Receive full support and guidance from our team of experts.'},
        {
            icon: '⏱️',
            title: 'Real-Time Monitoring',
            description: 'Seamlessly monitor data across all your devices in real time.',
        },
        {
            icon: '📚',
            title: 'Educational Materials',
            description: 'Access resources and learn how to build your own ClimateNet device with ease.',
        },
        {
            icon: '🌍',
            title: 'Join the Community',
            description: 'Be part of a global community dedicated to monitoring and improving Earth\'s climate.',
        },
    ];

    const handlePayNow = () => {

        alert("Payment process initiated for " + device.price);
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true      // Ensures animation runs only once
        });
    }, []);

    return (
        <div className={styles.paymentSection}>
            <div data-aos="fade-up" className={'container'}>
                <h2>Buy Your Own Device</h2>
                <div className={styles.payment_information_section}>
                    <div className={styles.device_sale_section}>
                        <ReactCardFlip
                            isFlipped={isFlipped}
                            flipDirection="vertical"
                            flipSpeed={1}
                        >
                            <div className={styles.sale_front}>
                                <div className={styles.front_wrapper}>
                                    <div className={styles.benefits}>
                                        <div className={styles.benefits_grid}>
                                            {benefits.map((benefit, index) => (
                                                <BenefitCard
                                                    key={index}
                                                    icon={benefit.icon}
                                                    title={benefit.title}
                                                    description={benefit.description}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleClick}>Buy Device</button>
                            </div>
                            <div className={styles.sale_back}>
                                <CheckoutAndDelivery/>
                                <div className={styles.sale_buttons_block}>
                                    <button onClick={handleClick}>Back</button>
                                    <div>
                                        <button onClick={handleClick}>Checkout</button>
                                    </div>

                                </div>

                            </div>
                        </ReactCardFlip>
                    </div>
                    <div className={styles.image_section}>
                        <img src={device.imageUrl} alt="Device" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
