import React from "react";
import { FaUser } from "react-icons/fa";
const BannerCard = () => {
  return (
    <>
      <div className='flex justify-center space-x-8 mt-8 flex-wrap md:flex-nowrap'>
        {/* Search Card */}
        <div className='mb-4 flex justify-between hover:cursor-pointer card p-8 max-w-xs rounded-lg overflow-hidden shadow-2xl bg-shadow hover:shadow-xl transition-shadow duration-300 ease-in-out'>
          <div>
            <h2 className='text-2xl font-bold'>Search</h2>
            <p className='font-Roboto'>
              1500+ bottles to choose from the list of the
            </p>
          </div>
          <FaUser className='text-3xl text-orang' /> {/* User icon */}
        </div>

        {/* Tap Card */}
        <div className='mb-4 flex justify-between hover:cursor-pointer card p-8 max-w-xs rounded-lg overflow-hidden shadow-2xl bg-shadow hover:shadow-xl transition-shadow duration-300 ease-in-out'>
          <div>
            <h2 className='text-2xl font-bold'>Tap</h2>
            <p className='font-Roboto'>
              Checkout in seconds with the xpress checkout
            </p>
          </div>
          <FaUser className='text-3xl text-orang' /> {/* User icon */}
        </div>

        {/* Drink Card */}
        <div className='mb-4 flex justify-between hover:cursor-pointer card p-8 max-w-xs rounded-lg overflow-hidden shadow-2xl bg-shadow hover:shadow-xl transition-shadow duration-300 ease-in-out'>
          <div>
            <h2 className='text-2xl font-bold'>Drink</h2>
            <p className='font-Roboto'>Delivered to your door within days</p>
          </div>
          <p className='text-5xl text-orang'>🚚</p>
        </div>
      </div>
    </>
  );
};

export default BannerCard;
