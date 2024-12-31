import React from "react";
import { useCart } from "../FrontFace/useContext/CartContext";
import { Link } from "react-router-dom";
import Dashboard from "../FrontFace/Dashboard";

const Checkout = () => {
  const { totalQuantity, showLoading, hideLoading } = useCart();
  const getProducts = JSON.parse(localStorage.getItem("cart"));
  console.log(getProducts);
  const calculateTotal = (data) => {
    return data.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const totalPrice = calculateTotal(getProducts);
  return (
    <Dashboard>
      <div className='min-h-screeen bg-darkWhite flex justify-center p-4 px-4'>
        <div className='max-w-5xl w-full p-4'>
          <h1 className='text-center font-semibold text-3xl mt-1'>
            HOW WOULD YOU LIKE YOUR ORDER?
          </h1>
          <div className='flex justify-center items-center mt-2'>
            <div className='flex  border border-lightSlateGray p-4 bg-white outline-nonee'>
              <input type='radio' />
              <div className='ml-2'>
                <p className='text-xl font-semibold text-slateGray'>
                  CLick n Cllect
                </p>
                <p className='text-slateGray'>
                  Collect from nearest Daddy's Store
                </p>
              </div>
            </div>
            <div className='ml-4 flex  border border-lightSlateGray p-4 bg-white outline-nonee'>
              <input type='radio' />
              <div className='ml-2'>
                <p className='text-xl font-semibold text-slateGray'>
                  CLick n Cllect
                </p>
                <p className='text-slateGray'>
                  Collect from nearest Daddy's Store
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white mt-2 p-4'>
            <h2 className='font-cursive   border-b mb-2'>
              Confirm Delivery Address
            </h2>
            <form action=''>
              <div className='flex'>
                {" "}
                <label
                  htmlFor=''
                  className='w-1/2 text-center font-semibold text-lightSlateGray'>
                  Entrer your Name
                </label>
                <input
                  type='text'
                  placeholder='Enter your Fuill name'
                  className='p-2 block w-full border border-lightSlateGray shadow rounded-sm text-lightSlateGray'
                />
              </div>
              <div className='flex mt-2'>
                <label
                  htmlFor=''
                  className='w-1/2 text-center font-semibold text-lightSlateGray'>
                  Entrer your Name
                </label>
                <input
                  type='text'
                  placeholder='Enter your Fuill name'
                  className='p-2 block w-full border border-lightSlateGray shadow rounded-sm text-lightSlateGray'
                />
              </div>
              <div className='flex mt-2'>
                {" "}
                <label
                  htmlFor=''
                  className='w-1/2 text-center font-semibold text-lightSlateGray'>
                  Checkout time
                </label>
                <input
                  type='text'
                  placeholder='Enter your Fuill name'
                  className='p-2 block w-full border border-lightSlateGray shadow rounded-sm text-lightSlateGray'
                />
              </div>
              <div className='flex mt-2'>
                {" "}
                <label
                  htmlFor=''
                  className='w-full text-center font-semibold text-lightSlateGray'>
                  Voucher
                </label>
                <input
                  type='text'
                  placeholder='Enter your Voucher Code'
                  className='p-2 block w-full border border-lightSlateGray shadow rounded-sm text-lightSlateGray uppercase'
                />
                <button className='bg-slateGray p-2 text-white ml-2 w-full'>
                  Apply Voucher
                </button>
              </div>
            </form>
            <div className='flex items-center justify-between m-4 mb-4'>
              <Link to='/' className='bg-slateGray p-4 text-white'>
                RETURN TO STORE
              </Link>
              <Link className='bg-orang p-4 text-black' to='/payment'>
                Continue to Payment
              </Link>
            </div>
          </div>

          {/* the one I  am working ion right nowi */}
        </div>
        <div className='ml-8 w-1/4 p-4 bg-white shadow '>
          <div className=' w-full mb-6'>
            <h3 className='text-2xl font-semibold text-center font-Roboto  text-calmGreen'>
              Order Summary
            </h3>
            <p className='mb-2 '>From Daddy's ecommerce</p>
          </div>
          {getProducts.map((cartProduct) => (
            <div className='flex justify-between text-sm mb-2  border-b border-slateGray'>
              <img
                src={
                  cartProduct.image
                    ? cartProduct.image.split("").length > 40
                      ? `data:image/png;base64, ${cartProduct.image}`
                      : `http://localhost:1234/${cartProduct.image}`
                    : "https://media.tenor.com/Rwl2AydK4z4AAAAe/not-available-fam-na.png"
                }
                alt=''
                className='h-[60px] w-[60px]'
              />
              <p className='text-lightSlateGray'>{cartProduct.name}</p>
              <p className='text-lightSlateGray'>${cartProduct.price}</p>
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <p className='text-lightSlateGray'>SubTotal (including GST)</p>
            <p className='text-lightSlateGray'>{totalPrice}</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-lightSlateGray'>Transaction Fees</p>
            <p className='text-lightSlateGray'>
              {(totalPrice * 0.1).toString().slice(0, 3)}
            </p>
          </div>
          <div className='flex justify-between items-center '>
            <p className='text-lightSlateGray'>Total</p>
            <p className='text-lightSlateGray'>
              {totalPrice + totalPrice * 0.1}
            </p>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Checkout;
