import React from "react";
import { Link } from "react-router-dom";
import ProductsUnder50 from "./ProductDisplay/ProductsUnder50";

const Under50 = () => {
  return (
    <div className='mx-20 m-3 p-2'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-sourGummy'>
          Bottles <br />
          <span className='font-semibold text-4xl font-sourGummy text-calmGreen'>
            Under $50
          </span>
        </h2>
        <div className='flex items-center'>
          <Link className='border-2 p-2 text-blue font-semibold rounded-lg hover:bg-blue hover:text-white'>
            Show All
          </Link>
        </div>
      </div>
      <div className='flex flex-col'>
        <ProductsUnder50 />
      </div>
      <div> </div>
    </div>
  );
};

export default Under50;
