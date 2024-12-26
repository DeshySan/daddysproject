import React, { useState } from "react";
import Dashboard from "../FrontFace/Dashboard";
import axios from "axios";
import { sweetError, sweetSuccess } from "../adminPages/errorHandler";

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    amount: 1000, // Amount in minor units (e.g., 10.00 USD = 1000)
    currency: "AUD",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name is ${name} and value is ${value}`);
    setPaymentData({ ...paymentData, [name]: value });
  };

  const makePayment = async () => {
    try {
      const response = await axios.post(`/api/v1/payments/make-payment`, {
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: {
          type: "scheme",
          encryptedCardNumber: `test_${paymentData.cardNumber}`, // Mock encryption
          encryptedExpiryMonth: `test_${paymentData.expiryMonth}`,
          encryptedExpiryYear: `test_${paymentData.expiryYear}`,
          encryptedSecurityCode: `test_${paymentData.securityCode}`,
        },
        reference: "YOUR_ORDER_NUMBER",
        returnUrl: "https://your-company.com/",
      });
      if (response.data.resultCode === "Authorised") {
        sweetSuccess("Payment Successfull");
      } else {
        sweetError("Payment has been declined");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dashboard>
      <div className='flex items-center justify-center flex-col p-3 w-full'>
        <h2 className='font-Roboto'>Adyen Payment Form</h2>
        <div className='flex flex-col w-1/2'>
          <label className='text-left' htmlFor='cardNumber'>
            Enter the card number
          </label>
          <input
            type='text'
            name='cardNumber'
            placeholder='Card Number'
            className='border w-full border-orang border-bottom'
            value={paymentData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <input
          type='text'
          name='expiryMonth'
          placeholder='Expiry Month'
          value={paymentData.expiryMonth}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='expiryYear'
          placeholder='Expiry Year'
          value={paymentData.expiryYear}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='securityCode'
          placeholder='CVV'
          value={paymentData.securityCode}
          onChange={handleInputChange}
        />
        <button onClick={makePayment}>Pay</button>
      </div>
    </Dashboard>
  );
};

export default PaymentComponent;
