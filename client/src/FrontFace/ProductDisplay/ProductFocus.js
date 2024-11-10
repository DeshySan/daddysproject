import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";

const ProductFocus = () => {
  return (
    <Dashboard>
      <div className='bg-gradient-to-r from-orang via-purple-500 to-indigo-500 text-white p-4 flex items-center justify-center overflow-hidden'>
        <div className='flex items-center space-x-4 animate-marquee'>
          <span className='text-2xl font-bold text-yellow-300'>
            ✨ FLASH SALE ALERT! ✨
          </span>
          <span className='text-xl md:text-2xl font-semibold text-black'>
            Enjoy{" "}
            <span className='text-4xl font-extrabold text-yellow-400'>
              25% OFF
            </span>{" "}
            Everything!
          </span>
          <span className='text-sm md:text-base text-slateGray'>
            🛍️ Shop your favorites today & save big! 🛒
          </span>
        </div>
      </div>
      {/* starts the product are */}
      <div className='flex  w-full justify-center my-8'>
        <div className='flex w-full max-w-6xl space-x-8'>
          {/* Image section - 50% of the container */}
          <div className='picture w-1/2'>
            <img
              className='h-[700px] w-full object-cover rounded-lg'
              src='https://images.pexels.com/photos/2529468/pexels-photo-2529468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Whiskey'
            />
          </div>
          <div className='product-details w-1/2  flex flex-col '>
            <h2 className='text-xl font-Roboto p-2'>
              Dimple 12 Year Old Blended Scotch Whisky 700mL
            </h2>
            <p className='text-xl p-2'>
              $49 <span className='text-red ml-3'>$45</span>
            </p>
            <h1 className='text-xl font-semibold p-2'>About this Product</h1>
            <p className='p-2'>
              Chateau Grand Meynau Bordeaux presents a dark deep ruby red.
              Intense, ripe fruits such as plum, raspberry and black cherry
              expose a lovely complexity when the hint of creamy spice surfaces.
              The palate delivers a harmonious mix of berries and gentle
              tannins.
            </p>
            <button className='bg-black text-white p-4 w-1/4 mt-4 rounded-sm hover:bg-orang hover:text-black font-semibold hover:scale-105'>
              Add to Cart
            </button>
            <div className='flex flex-col mt-10'>
              <h2 className='text-center font-semibold text-2xl'>
                You might also like
              </h2>
              <div className='flex flex-row'>
                {" "}
                <div className='recc'>
                  <img
                    src='https://factorie.com.au/dw/image/v2/BBDS_PRD/on/demandware.static/-/Sites-catalog-master-factorie/default/dw2d27b3d4/5299409/5299409-10-2.jpg?sw=286&sh=429&sm=fit'
                    alt=''
                    className='h-[250px] w-[200px] mt-4'
                  />
                  <p>Short Sleeve Shirt</p>
                </div>
                <div className='recc ml-4'>
                  <img
                    src='https://factorie.com.au/dw/image/v2/BBDS_PRD/on/demandware.static/-/Sites-catalog-master-factorie/default/dw2d27b3d4/5299409/5299409-10-2.jpg?sw=286&sh=429&sm=fit'
                    alt=''
                    className='h-[250px] w-[200px] mt-4'
                  />
                  <p>Short Sleeve Shirt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProductFocus;
