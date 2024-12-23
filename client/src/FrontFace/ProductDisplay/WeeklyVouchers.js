import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import giftcard from "../../assets/giftcard.png";
import barcode from "../../assets/barcode.png";
import { Link } from "react-router-dom";
import Barcode from "react-barcode";
import axios from "axios";
const WeeklyVouchers = () => {
  const [voucherDetail, setVoucherDetail] = useState("");
  const fetchPromotionalVoucher = async () => {
    try {
      const { data } = await axios.get(`/api/v1/adminAPI/get-voucher`);
      console.log(data.voucher[0].barcode);
      setVoucherDetail(data.voucher);
    } catch (error) {
      console.log(error);
    }
  };

  //want to run this when the page loads
  useEffect(() => {
    fetchPromotionalVoucher();
  }, []);
  return (
    <Dashboard>
      <div
        className='h-[350px] relative '
        style={{ backgroundImage: `url(${giftcard})` }}>
        <div className='w-[450px] p-4 px-10 ml-40 bg-white absolute mt-16 rounded-md grid'>
          <h1 className='font-semibold text-xl'>GIFT CARDS</h1>
          <p>
            Send a gift card to a loved one today! Shop our range of physical
            gift cards for entertainment, shopping and leisure experiences.
            Delivered to you or a loved one by post.
          </p>
          <button className='px-10 p-2 bg-orang rounded-md justify-self-end text-white'>
            <Link to='/gift-cards'> Buy Here</Link>
          </button>
        </div>
      </div>
      <div className='bg-orang h-[400px] mx-20 mt-2 rounded-lg relative'>
        <div className='h-full flex justify-center items-center flex-col'>
          <p className='text-lg'>
            {" "}
            ----------------------Daddy's ecommerce by
            SwiftPOS---------------------
          </p>
          <div className='flex justify-center items-center'>
            <p className='text-8xl font-Roboto font-bold text-white'>10</p>
            <div className='ml-4'>
              <p className='text-4xl font-Roboto font-bold text-white'>% OFF</p>
              <p className='text-3xl font-Roboto font-bold text-white'>
                COUPON
              </p>
            </div>
          </div>
          <Barcode value={voucherDetail[0]?.barcode} width={3} />
          <div className='h-6 bg-slateGray mt-2 w-[400px] rounded-full text-white text-center font-semibold'>
            DADDY'S ECOMMERCE BY SWIFTPOS!
            <p className='text-gray-600  text-sm   left-1/2 '>
              クーポンコードクーポンコード クーポンコード
            </p>
          </div>
        </div>
        <div className='absolute top-[50%] transform rotate-90 font-bold text-md text-white'>
          クーポンコードクーポンコード クーポンコード
        </div>
        <div className='absolute left-8 top-[50%] transform rotate-90 font-bold text-md text-white'>
          クーポンコードクーポンコード クーポンコード
        </div>
      </div>
    </Dashboard>
  );
};

export default WeeklyVouchers;
