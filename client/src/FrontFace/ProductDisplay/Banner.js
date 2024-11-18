import React from "react";
// import banner from "../assets/banner.png";
import banner from "../../assets/banner.png";
const Banner = () => {
  return (
    <div>
      <div className='banner'>
        <div
          className='rounded-xl relative m-0 mt-5 sm:p-6 sm:m-12 h-[500px] bg-cover bg-center overflow-hidden'
          style={{
            backgroundImage: `url(${banner})`,
          }}>
          <div className='absolute inset-0 bg-black opacity-50 h-full'></div>
          <div className='relative h-full z-10 text-center text-white p-6 sm:p-12 flex  flex-col justify-center items-center'>
            <h1 className='text-4xl sm:text-5xl font-bold mb-4'>
              Discover Amazing Deals
            </h1>
            <p className='text-lg sm:text-2xl mb-6'>
              Get the best products at unbeatable prices. Shop now and save big!
            </p>
            <a
              href='#'
              className='inline-block bg-orang opacity-90 text-white text-xl py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300'>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
