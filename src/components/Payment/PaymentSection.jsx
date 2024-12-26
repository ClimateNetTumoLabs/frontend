import React from "react";
import styles from "./Payment.module.css";
import PaymentButton from "./Payment";

const PaymentSection = () => {
  const device = {
    imageUrl: "https://images-in-website.s3.us-east-1.amazonaws.com/Weather/device.svg",
    description: "ClimateNet devices are advanced IoT climate monitoring tools designed to provide real-time environmental data. These devices collect crucial weather metrics such as temperature, humidity, UV levels, and air quality, enabling informed decision-making for businesses, agriculture, and local authorities. Ideal for anyone looking to enhance their climate monitoring capabilities with reliable and accurate data.",
    price: "$399.99", 
  };

  const handlePayNow = () => {
    
    alert("Payment process initiated for " + device.price);
  };

  return (
    <div className={styles.paymentSection}>
      <img src={device.imageUrl} alt="Device" />
      <div>
        <p>{device.description}</p>
        <p className={styles.price}>{device.price}</p>
        <PaymentButton/>
      </div>
    </div>
  );
};

export default PaymentSection;
