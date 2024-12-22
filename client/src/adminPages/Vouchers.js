import React, { useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import Barcode from "react-barcode";
import axios from "axios";

const Vouchers = () => {
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const [vId, setVID] = useState(0);
  const [memberId, setMemberId] = useState(0);
  const [promoVoucher, setPromoVoucher] = useState("");

  //save to the back office and this db
  const handleIssue = async () => {
    const { data } = await axios.post(`/api/v1/adminAPI/post-vouchers`, {
      vId,
      mId: memberId,
      barcode: inputValue,
    });
    console.log(data);
  };
  //functions
  const handleInputChange = (event) => {
    let barcodeText = event.target.value;
    setInputValue(barcodeText);
  };

  const clearInput = () => {
    setInputValue(""); // Reset the state
  };
  const randomBarcode = () => {
    const test = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    setInputValue(test);
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
              value={vId}
              onChange={(e) => setVID(e.target.value)}
            />
            <input
              type='number'
              placeholder='Enter your MemberID'
              className='border border-red block p-2 ml-4 w-1/2'
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter the promotional Description'
              className='border border-red block p-2 ml-4 w-full'
            />
          </div>
          <button
            className='p-3 bg-slateGray mt-4 mb-2'
            onClick={randomBarcode}>
            Click here to Generate a Barcode
          </button>
          <input
            type='text'
            placeholder='Voucher Barcode'
            className='border border-red block p-2 ml-4 w-1/2'
            value={inputValue}
            onChange={handleInputChange}
          />{" "}
          <button
            onClick={clearInput}
            className='p-2 bg-slateGray text-black mt-4'>
            Clear Barcode
          </button>
          <button
            onClick={handleIssue}
            className='p-2 bg-slateGray text-white mt-4'>
            Issue Voucher
          </button>
          <Barcode value={inputValue || " "} />
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
