import React, { useState } from "react";
import axios from "axios";
import { getCSRFToken } from "../utils/csrf";

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderID, setOrderID] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            // Retrieve CSRF token
            const csrfToken = getCSRFToken();

            // Send POST request to initiate payment
            const response = await axios.post(
                "/payments/initiate/",
                {}, // Empty payload since the backend handles amount
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken, // Include CSRF token
                    },
                }
            );

            if (response.data.payment_url) {
                setOrderID(response.data.order_id); // Store orderID if needed
                console.log(response.data.order_id)
                console.log(response.data.payment_id)
                window.location.href = response.data.payment_url;
            } else {
                throw new Error("Payment URL not received");
            }
        } catch (err) {
            console.error("Error initializing payment:", err);
            setError("Failed to initialize payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{  marginTop: "20px" }}>
            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    padding: "10px 20px",
                    backgroundColor: loading ? "#ccc" : "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                    
                }}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
};

export default PaymentButton;
