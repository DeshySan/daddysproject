import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import Barcode from "react-barcode";
import axios from "axios";

const Vouchers = () => {
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const [vId, setVID] = useState(0);
  const [memberId, setMemberId] = useState(0);
  const [promoVoucher, setPromoVoucher] = useState([]);
  const [isActive, setIsActive] = useState(false);

  //save to the back office and this db
  const handleIssue = async () => {
    const { data } = await axios.post(`/api/v1/adminAPI/post-vouchers`, {
      vId,
      mId: memberId,
      barcode: inputValue,
    });
    getVouchers();
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
    //To make the voucher always unique timestamps is used and to make it look like it is from SwiftPOS, we use number 44 infront
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const test = Math.floor(440000000000 + timestampInSeconds).toString();
    setInputValue(test);
  };

  //get the List of vouchers from Back Office
  const getVouchers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/adminAPI/get-vouchers`);
      setPromoVoucher(data.voucher);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVouchers = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/adminAPI/delete-vouchers/${id}`
      );
      getVouchers();
    } catch (error) {
      console.log(error);
    }
  };
  // const voucherDisplay = async (id) => {
  //   try {
  //     const { data } = await axios.patch(
  //       `/api/v1/adminAPI/toggle-voucher/${id}`
  //     );
  //     console.log(data);
  //     if (data.success) {
  //       setIsActive(!isActive); // Toggle the button state based on the response
  //       getVouchers();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const voucherDisplay = async (id) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/adminAPI/toggle-voucher/${id}`
      );
      if (data.success) {
        setPromoVoucher((prev) =>
          prev.map((voucher) =>
            voucher._id === id
              ? {
                  ...voucher,
                  displayPromotional: voucher.displayPromotional === 0 ? 1 : 0,
                }
              : voucher
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <AdminDashboard>
      <div className='w-full'>
        <h1 className='font-semibold text-xl'>GET VOUCHERS</h1>
        <h1 className='font-semibold text-lg text-center'>
          ISSUE A PROMOTIONAL VOUCHERS
        </h1>
        <div className='flex w-full justify-center items-center flex-col'>
          <div className='flex '>
            <div className='flex flex-col w-full'>
              <label htmlFor=''>Enter your Voucher ID</label>
              <input
                type='number'
                placeholder='Enter your V ID'
                className='border border-red block p-2 w-1/2'
                value={vId}
                onChange={(e) => setVID(e.target.value)}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor=''>Enmter your member Id</label>
              <input
                type='number'
                placeholder='Enter your MemberID'
                className='border border-red block p-2 ml-4 w-1/2'
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor=''>Enter the Description</label>
              <input
                type='text'
                placeholder='Enter the promotional Description'
                className='border border-red block p-2 ml-4 w-full'
              />
            </div>
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
              Voucher Barcode
            </th>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              Voucher Name
            </th>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              Display on Web
            </th>
            <th className='py-2 px-4 text-center text-sm font-semibold text-slateGray'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {promoVoucher?.map((voucher) => (
            <tr className=''>
              <td>{voucher._id}</td>
              <td>{voucher.barcode}</td>

              <td>{voucher.name ? voucher.name : "N/A"}</td>
              <td>
                <button
                  onClick={() => voucherDisplay(voucher._id)}
                  className='bg-orang p-1 text-white font-semibold'>
                  {voucher.displayPromotional === 1
                    ? "Deactivate Promotion"
                    : "Activate Promotion"}
                </button>
              </td>
              <td>
                <button
                  className='bg-red p-2 text-white'
                  onClick={() => deleteVouchers(voucher._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminDashboard>
  );
};

export default Vouchers;
