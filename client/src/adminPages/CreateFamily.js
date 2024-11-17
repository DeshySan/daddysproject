import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";

//in this I will implement a deboucing mechanism to prevent unwanted noise from the input which will hold the search by probably 300ms

const CreateFamily = () => {
  return (
    <AdminDashboard>
      <div className='flex justify-center items-center flex-col w-full'>
        <div className='heading'>
          <h1 className='text-4xl font-semibold capitalize '>
            Create A Family
          </h1>
        </div>
        <div className='form w-full flex justify-center flex-col items-center'>
          <div className='mb-2 flex flex-col w-1/3'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              className='border border-black p-3 rounded-md text-center'
            />
          </div>
          <div className='mb-2 flex flex-col w-1/3'>
            <label htmlFor='name'>Products</label>
            <input
              type='text'
              name='Search'
              className='border border-black p-3 rounded-md text-center'
            />
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default CreateFamily;
