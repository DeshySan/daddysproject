import React from "react";

const Content = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'>
          <h2 className='text-lg font-semibold text-gray-800'>Categories</h2>
          <p className='text-sm text-gray-600 mt-2'>
            Some information or stats.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'>
          <h2 className='text-lg font-semibold text-gray-800'>Products</h2>
          <p className='text-sm text-gray-600 mt-2'>
            Some information or stats.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'>
          <h2 className='text-lg font-semibold text-gray-800'>Users</h2>
          <p className='text-sm text-gray-600 mt-2'>
            Some information or stats.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'>
          <h2 className='text-lg font-semibold text-gray-800'>
            BMR Calculation
          </h2>
          <p className='text-sm text-gray-600 mt-2'>
            Some information or stats.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'>
          <h2 className='text-lg font-semibold text-gray-800'>Reports</h2>
          <p className='text-sm text-gray-600 mt-2'>
            Some information or stats.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
