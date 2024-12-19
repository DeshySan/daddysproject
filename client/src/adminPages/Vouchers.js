import React, { useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import Barcode from "react-barcode";

const Vouchers = () => {
  const [inputValue, setInputValue] = useState(""); // State to track input value

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <AdminDashboard>
      <div className='w-full'>
        <h1 className='font-semibold text-xl'>GET VOUCHERS</h1>
        <h1 className='font-semibold text-lg text-center'>
          ISSUE A PROMOTIONAL VOUCHERS
        </h1>
        <div className='flex w-full justify-center items-center flex-col'>
          <div className='flex'>
            <input
              type='number'
              placeholder='Enter your V ID'
              className='border border-red block p-2 w-1/2'
            />
            <input
              type='number'
              placeholder='Enter your MemberID'
              className='border border-red block p-2 ml-4 w-1/2'
            />
            <input
              type='text'
              placeholder='Enter the promotional Discription'
              className='border border-red block p-2 ml-4 w-full '
            />
          </div>
          <button className='p-3 bg-slateGray mt-4 mb-2'>
            Click here to Generate a Barcode
          </button>
          <input
            type='text'
            placeholder='Voucher Barcode'
            className='border border-red block p-2 ml-4 w-1/2 '
            onChange={handleInputChange}
          />
          <Barcode value={inputValue} />
        </div>
      </div>
      <table className='min-w-full rounded-lg shadow-md text-center'>
        <thead className='bg-lightSlateGray'>
          <tr>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              ID
            </th>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              Voucher Name
            </th>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              Status
            </th>
          </tr>
        </thead>
      </table>
    </AdminDashboard>
  );
};

export default Vouchers;
