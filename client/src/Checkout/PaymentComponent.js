import React from "react";

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    amount: 1000, // Amount in minor units (e.g., 10.00 USD = 1000)
    currency: "USD",
  });
  return <div>PaymentComponent</div>;
};

export default PaymentComponent;
