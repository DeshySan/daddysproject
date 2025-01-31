import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import registerImage from "../../assets/bannerImage.jpg"; // Make sure this path is correct
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sweetError, sweetSuccess } from "../../adminPages/errorHandler.js";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../Redux/authslice";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useContext/CartContext";

const MemberRegister = () => {
  const { showLoading, hideLoading } = useCart();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [classification, setClassification] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  //hooks
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );
  // Toggle between login and register
  const changeLogin = () => {
    setIsLogin(!isLogin);
  };

  //login member
  const handleLogin = async () => {
    dispatch(loginRequest());
    try {
      const { data } = await axios.post(`/api/v1/member/login-member`, {
        email,
        password,
      });
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure("Invalid credentials"));
      console.log(error);
    }
  };

  const handleMemberRegister = async () => {
    showLoading();
    try {
      const { data } = await axios.post(`/api/v1/member/post-member`, {
        fullName,
        email,
        password,
        mobile,
        classification,
      });
      if (data.success) {
        sweetSuccess("Member has been registered successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  return (
    <div>
      <Dashboard>
        <div className='w-full flex flex-col items-center justify-start'>
          {/* Background Image */}
          <div
            className='rounded-xl mx-0 sm:mx-0 m-4 p-0 h-[300px] sm:h-[400px] lg:h-[500px] bg-contain bg-center bg-no-repeat overflow-hidden w-full'
            style={{ backgroundImage: `url(${registerImage})` }}></div>

          {/* Register Form (Visible when !isLogin) */}
          {!isLogin && (
            <div className='form flex flex-col w-full items-center justify-start mt-0 sm:mt-0'>
              <div className='w-1/3 mb-4'>
                <label className='font-semibold'>
                  Already Have an account?
                </label>
              </div>

              <button
                onClick={changeLogin}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2 hover:bg-orang hover:text-black hover:border-orang'>
                Login
              </button>

              <h1 className='text-left text-2xl text-bold text-orang font-sourGummy mt-6'>
                Register
              </h1>

              <input
                type='text'
                placeholder='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <input
                type='text'
                placeholder='Email *'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <input
                type='password'
                placeholder='Password *'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <input
                type='number'
                placeholder='Mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <select
                name='classification'
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
                value={classification}
                onChange={(e) => setClassification(e.target.value)}>
                <option value='high'>High</option>
                <option value='low'>Low</option>
              </select>

              <button
                className='bg-orang text-white w-1/3 mt-3 p-3 font-semibold text-xl rounded-md'
                onClick={handleMemberRegister}>
                Register
              </button>
            </div>
          )}

          {/* Login Form (Visible when isLogin is true) */}
          {isLogin && (
            <div className='form flex flex-col w-full items-center justify-start mt-0 sm:mt-0'>
              <label>Already Have an account?</label>
              <button
                onClick={changeLogin}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2 hover:bg-orang hover:text-black hover:border-orang'>
                Register
              </button>
              <h1 className='text-left text-2xl text-bold text-orang font-sourGummy mt-6'>
                Login
              </h1>

              <input
                type='text'
                placeholder='Email *'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <input
                type='password'
                placeholder='Password *'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-slateGray px-8 py-2 w-1/3 rounded-lg border-2 mt-2'
              />
              <button
                onClick={handleLogin}
                className='bg-orang text-white w-1/3 mt-3 p-3 font-semibold text-xl rounded-md'>
                Login
              </button>
            </div>
          )}
        </div>
      </Dashboard>
    </div>
  );
};

export default MemberRegister;
