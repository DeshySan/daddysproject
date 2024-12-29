import React, { useState } from "react";
import Dashboard from "../FrontFace/Dashboard";
import axios from "axios";
import { sweetError, sweetSuccess } from "../adminPages/errorHandler";
import credit from "../../src/assets/credit_card_amex.svg";
const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: null,
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    amount: 1000, // Amount in minor units (e.g., 10.00 USD = 1000)
    currency: "AUD",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "expiryMonth") {
      if (value.length <= 2) {
        setPaymentData({ ...paymentData, [name]: value });
      }
    } else if (name === "expiryYear") {
      if (value.length <= 2) {
        setPaymentData({ ...paymentData, [name]: value });
      }
    } else if (name === "securityCode") {
      if (value.length <= 3) {
        setPaymentData({ ...paymentData, [name]: value });
      }
    } else if (name === "cardNumber") {
      if (!isNaN(value)) {
        setPaymentData({ ...paymentData, [name]: value });
      }
    } else {
      sweetError("Oopsies something went wrong");
      setPaymentData({ ...paymentData });
    }
    // setPaymentData({ ...paymentData, [name]: value });
  };

  const makePayment = async () => {
    if (
      !paymentData.cardNumber ||
      !paymentData.expiryMonth ||
      !paymentData.expiryYear ||
      !paymentData.securityCode
    ) {
      sweetError("Card Details havent been entered correctly");
    } else if (
      typeof paymentData.cardNumber !== "number" ||
      typeof paymentData.expiryMonth !== "number" ||
      typeof paymentData.expiryYear !== "number" ||
      typeof paymentData.securityCode !== "number"
    ) {
      sweetError("Invalid details Provided");
    }
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
        <h2 className='font-cursive font-bold text-5xl'> Payment </h2>
        <div className='p-2 bg-darkWhite w-1/2'>
          <img src={credit} alt='' />
        </div>
        <div className='flex flex-col w-1/2'>
          <label className='text-left' htmlFor='cardNumber'>
            Enter the card number
          </label>
          <input
            type='number'
            name='cardNumber'
            placeholder='Card Number'
            className=' w-1/2 border-orang border-b text-center bg-darkWhite p-2 rounded'
            value={paymentData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex w-1/2 items-left justify-left'>
          <input
            type='text'
            name='expiryMonth'
            placeholder='Expiry Month'
            value={paymentData.expiryMonth}
            className='p-2 w-1/4 border-darkWhite mt-2 border-b text-center bg-darkWhite'
            onChange={handleInputChange}
          />

          <input
            type='text'
            name='expiryYear'
            placeholder='Expiry Year'
            className='p-2 w-1/4 ml-2 border-darkWhite mt-2 border-b text-center bg-darkWhite'
            value={paymentData.expiryYear}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex flex-col w-1/2'>
          <input
            type='text'
            name='securityCode'
            placeholder='CVV'
            className='p-2 w-1/4 border-darkWhite mt-2 border-b text-center bg-darkWhite'
            value={paymentData.securityCode}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={makePayment}
          className='p-2 w-40 bg-orang px-4 rounded-sm text-white transform transition duration-300 hover:scale-110 focus:scale-x-110'>
          Pay
        </button>
      </div>
    </Dashboard>
  );
};

export default PaymentComponent;
