import React from "react";
import Dashboard from "../Dashboard";
import registerImage from "../../assets/bannerImage.jpg"; // Make sure this path is correct

const MemberRegister = () => {
  return (
    <div>
      <Dashboard>
        <div className='flex w-full flex-row '>
          <div
            className='rounded-xl mx-28 m-4 relative p-6 h-[500px] bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden w-full '
            style={{ backgroundImage: `url(${registerImage})` }}></div>
          <div className='form flex flex-row'>
            <label>Already Have an account?</label>
            <button>Login</button>
            <input type='text' placeholder='Full Name' />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default MemberRegister;
