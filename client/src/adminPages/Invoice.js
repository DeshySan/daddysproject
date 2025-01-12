import React from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";

const Invoice = () => {
  return (
    <AdminDashboard>
      <table className='bg-darkWhite min-w-full overflow-hidden'>
        <thead>
          <tr>
            <th className='py-3'>Invoice ID</th>
            <th className='py-3'>Sale Total</th>
            <th className='py-3'>Member</th>
            <th className='py-3'>Status</th>
          </tr>
        </thead>
      </table>
    </AdminDashboard>
  );
};

export default Invoice;
