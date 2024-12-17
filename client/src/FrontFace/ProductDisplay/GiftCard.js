import React from "react";
import Dashboard from "../Dashboard";
import giftcard from "../../assets/giftcard.png";
const GiftCard = () => {
  return (
    <Dashboard className=''>
      <div
        className='h-[350px] relative '
        style={{ backgroundImage: `url(${giftcard})` }}>
        <div className='w-[450px] p-4 px-10 ml-40 bg-white absolute mt-16 rounded-md'>
          <h1 className='font-semibold text-xl'>GIFT CARDS</h1>
          <p>
            Send a gift card to a loved one today! Shop our range of physical
            gift cards for entertainment, shopping and leisure experiences.
            Delivered to you or a loved one by post.
          </p>
        </div>
      </div>
      <div className='flex justify-center items-center mx-20 w-full mt-10'>
        <p className='w-[30%]'>
          Celebrate the little things this year with a Liquor Legends eGift Card
          and personalised message, for the ultimate silly season surprise!
          <br />
          eGift Cards will be delivered via email and are redeemable in any
          Liquor Legends online stores.
        </p>
        <img
          className='h-[300px] ml-10'
          src='https://cdn.viicloud.com.au/Static/CI/ColesGroupV2/images/product/CGM594.png'
          alt=''
        />
      </div>
      <div className='bg-lightSlateGray h-[2px] mx-20 '></div>
      <div className='mx-60 flex mt-4 overflow-x-hidden p-8'>
        <div className='flex flex-col w-[40%] '>
          <h2 className='text-orang font-bold text-xl'>
            Step 1 - Choose an amount
          </h2>
          <p className='font-semibold'>Choose an amount between $20 and $500</p>
          <div className='flex mb-4'>
            <div className='p-2 px-5 text-orang border '>$20</div>
            <div className='p-2 px-5 text-orang border'>$50</div>
            <div className='p-2 px-5 text-orang border'>$100</div>
            <div className='p-2 px-5 text-orang border'>$200</div>
            <div className='p-2 px-5 text-orang border'>$500</div>
          </div>
          <hr />
          <h2 className='text-orang font-bold text-xl mt-4'>
            Step 2 - Enter Delivery details
          </h2>
          <label htmlFor='' className='font-semibold '>
            Email Address of Recipient:
          </label>
          <input type='text' className=' border-b' />
          <label className='font-semibold' htmlFor=''>
            When do you want to send it?
          </label>
          <input type='date' className=' border-b' />
        </div>
        <div className='w-[40%] flex flex-col ml-20 p-2'>
          <h1 className='font-semibold text-xl text-orang'>
            Step 3 - Enter Gift Card details
          </h1>
          <label className='font-semibold' htmlFor=''>
            To
          </label>
          <input type='text' className=' border-b' />
          <label className='font-semibold mt-4' htmlFor=''>
            Message for the Card
          </label>
          <input
            type='text'
            className=' border-b'
            placeholder='Enter a message'
          />
          <label className='font-semibold mt-4' htmlFor=''>
            From:
          </label>
          <input type='text' className=' border-b' />
          <button className='px-4 bg-orang mt-4 p-3 rounded-md text-white font-semibold hover:scale-110'>
            ADD GIFT CARD TO CART
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default GiftCard;
