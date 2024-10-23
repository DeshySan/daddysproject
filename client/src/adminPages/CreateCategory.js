import React from "react";

const CreateCategory = () => {
  return (
    <div className='flex items-center mb-4 w-full'>
      <div className='flex flex-col mb-0 w-full'>
        <label htmlFor='category'>Enter the Category name</label>
        <div className='flex items-center'>
          <input
            type='text'
            className='p-2 border-b border-b-red focus:outline-none focus:border-limeGreen w-[20%] flex-grow'
            name='category'
            placeholder='Enter the Category of the Product'
          />
          <button className='ml-4 bg-slateGray text-white p-2 rounded w-[150px]'>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
