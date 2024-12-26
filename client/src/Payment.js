import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdyenCheckout } from "@adyen/adyen-web";

function Payment() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.post(
          "http://localhost:1234/api/v1/payments/get-payment-methods",
          {
            amount: 1000, // Amount in cents (1000 = 10 AUD)
            countryCode: "AU", // Shopper's country (Australia)
            shopperLocale: "en-AU", // Locale (Australia)
          }
        );

        // Check if the paymentMethods key exists
        if (response.data.paymentMethods) {
          setPaymentMethods(response.data.paymentMethods); // Set the available payment methods
        } else {
          console.error("Payment methods not found in response.");
          setPaymentStatus("Error fetching payment methods.");
        }
      } catch (err) {
        console.error("Error fetching payment methods:", err);
        setPaymentStatus("Failed to fetch payment methods.");
      }
    };

    fetchPaymentMethods();
  }, []);

  const initiateCheckout = async (state, dropin) => {
    const paymentDetails = {
      paymentMethod: state.data.paymentMethod, // Payment method details
      amount: { currency: "AUD", value: 1000 }, // Amount in the smallest unit (e.g., 1000 = 10 AUD)
      reference: "ORDER12345", // Unique order reference
      returnUrl: "https://your-frontend.com/checkout-complete", // Frontend callback URL
      shopperReference: "BASD123", // Unique shopper ID
    };

    try {
      const response = await axios.post(
        "http://localhost:1234/api/v1/payments/initiate-payment",
        paymentDetails
      );

      if (response.data.resultCode === "Authorised") {
        setPaymentStatus("Payment successful!");
        dropin.setStatus("success", { message: "Payment successful!" });
      } else {
        setPaymentStatus("Payment failed!");
        dropin.setStatus("error", { message: "Payment failed!" });
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      dropin.setStatus("error", { message: "Payment failed!" });
      setPaymentStatus("Payment failed!");
    }
  };

  const startCheckout = () => {
    try {
      const checkout = new AdyenCheckout({
        environment: "test", // Use "live" for production
        clientKey:
          "AQEthmfxKI/LbBBAw0m/n3Q5qf3Ve5xEC4daV3YBniu5u1NL2FcrFienVYPI6c/oEMFdWw2+5HzctViMSCJMYAc=-wudUlxJZsK+ZKTP0zyrfnA7uecpzhgoXrMygEuH6XZ8=-i1iR52CdTfgGk4LD$9(", // Your provided API key (be cautious using it on the frontend)
        countryCode: "AU", // Shopper's country set to Australia
      });

      // Create Drop-in component
      const dropin = checkout
        .create("dropin", {
          paymentMethods: paymentMethods, // Pass available payment methods
          onSubmit: initiateCheckout,
        })
        .mount("#dropin-container");
    } catch (err) {
      console.error("Error initializing Adyen Checkout:", err);
      setPaymentStatus("Error initializing payment.");
    }
  };

  return (
    <div>
      <h1>Adyen Payment Integration</h1>
      <div id='dropin-container' />
      <button onClick={startCheckout}>Start Payment</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default Payment;
