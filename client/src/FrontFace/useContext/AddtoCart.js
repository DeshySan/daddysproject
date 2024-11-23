import React from "react";

const AddtoCart = () => {
  return (
    <div className='fixed top-0 rounded-md right-0 bg-slateGray bg-opacity-90 min-h-screen max-h-screen z-10 w-1/4 flex justify-center items-start p-4 mt-16'>
      <div className='w-full bg-white text-black rounded-md '>
        <h1 className='text-xl font-bold p-4'>Shopping Cart</h1>
        {/* Your cart content */}
        <p className='p-4'>Your cart is currently empty.</p>
        {/* You can list cart items here */}
      </div>
    </div>
  );
};

export default AddtoCart;
