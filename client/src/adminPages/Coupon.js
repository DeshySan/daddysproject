import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";
import { sweetSuccess } from "./errorHandler";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const getCoupons = async () => {
    try {
      const { data } = await axios.get(`/api/v1/coupon/get-coupon`);
      if (data.success) {
        setCoupons(data.coupon);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoupons = async (id, reactive) => {
    try {
      const { data } = await axios.put(`/api/v1/coupon/update-coupon/${id}`, {
        active: !reactive,
      });
      if (data.success) {
        sweetSuccess("Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <div>
      <AdminDashboard>
        <div className='overflow-auto max-h-screen'>
          <table className='min-w-full table-auto bg-white rounded-lg shadow-md max-h-screen'>
            {/* Table Header */}
            <thead className='bg-slateGray text-white'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Voucher Name
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  CODE
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Value
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Start Date
                </th>{" "}
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  End Date
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Active
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {coupons?.map((item) => (
                <tr className='hover:bg-orang hover:cursor-pointer transition-colors duration-300 shadow-sm p-1'>
                  <td className='px-6 py-3 text-sm text-center'>{item.name}</td>
                  <td className='px-6 py-3 text-sm'>{item.code}</td>
                  <td className='px-6 py-3 text-sm'>{item.value}</td>
                  <td className='px-6 py-3 text-sm'>
                    {item.startDate?.split("T")[0]}
                  </td>
                  <td className='px-6 py-3 text-sm'>
                    {" "}
                    {item.endDate?.split("T")[0]}
                  </td>
                  <td className='px-6 py-3 text-sm'>
                    <button
                      className='p-2 rounded-lg bg-orang text-white text-semiBold'
                      onClick={() => updateCoupons(item._id, item.active)}>
                      {item.active ? "Turn Off" : "Turn On"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminDashboard>
    </div>
  );
};

export default Coupon;
