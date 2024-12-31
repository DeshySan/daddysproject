import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";

const Member = () => {
  const [member, setMember] = useState(null);

  const getMembers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/member/get-member`);
      if (data.success) {
        setMember(data.members);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);
  return (
    <AdminDashboard>
      <div className='overflow-auto max-h-screen'>
        <table className='min-w-full table-auto bg-white rounded-lg shadow-md max-h-screen'>
          {/* Table Header */}
          <thead className='bg-slateGray text-white'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium'>#</th>
              <th className='px-6 py-3 text-left text-sm font-medium'>
                Full Name
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium'>
                Email Address
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium'>
                Verified Member
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {member?.map((item) => (
              <tr className='hover:bg-orang hover:cursor-pointer transition-colors duration-300 shadow-sm p-1'>
                <td className='px-6 py-3 text-sm text-center'>
                  {item.memberId}
                </td>
                <td className='px-6 py-3 text-sm'>{item.fullName}</td>
                <td className='px-6 py-3 text-sm'>{item.email}</td>
                <td className='px-6 py-3 text-sm'>
                  {item.memberVerified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminDashboard>
  );
};

export default Member;
