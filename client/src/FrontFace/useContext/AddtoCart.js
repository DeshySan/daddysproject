import React, { useEffect, useState } from "react";

const AddtoCart = ({ setCartModal }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const getItems = async () => {
    let testData = JSON.parse(localStorage.getItem("cart"));
    console.log(testData);
    setProducts(testData);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className='fixed top-0 rounded-md right-0 bg-slateGray bg-opacity-90 min-h-screen max-h-screen z-10 w-1/4 flex justify-center items-start p-4 mt-16'>
      <div className='w-full bg-white text-black rounded-md '>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold p-4'>Shopping Cart</h1>
          <button
            className='mr-8 font-bold'
            onClick={() => setCartModal(false)}>
            X
          </button>
        </div>

        {products?.map((item, index) => (
          <div className='p-4 flex space-x-6' key={index}>
            <img src={item.image} alt='' className='w-40 h-40 rounded-md' />
            <div>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <button className='bg-slateGray mt-2 p-1 px-3 rounded-sm text-white'>
                {item.quantity}
              </button>{" "}
              <br />
              <button className=' mt-6 bg-orang px-4 py-2 rounded-sm text-white hover:text-black'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddtoCart;
