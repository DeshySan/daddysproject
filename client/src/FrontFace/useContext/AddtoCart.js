import React, { useEffect, useState } from "react";
import { useCart } from "../useContext/CartContext.js";

const AddtoCart = ({ setCartModal }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const { removeFromCart, showLoading, hideLoading } = useCart();
  const getItems = async () => {
    let testData = JSON.parse(localStorage.getItem("cart"));
    setProducts(testData);

    const calculateTotal = (data) => {
      return data.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };
    const totalPrice = calculateTotal(testData);
    setTotal(totalPrice);
    hideLoading();
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    hideLoading();
  };

  useEffect(() => {
    showLoading();
    getItems();
  }, []);
  useEffect(() => {
    getItems();
  }, [handleRemove]);
  return (
    <div className='fixed top-0 rounded-md right-0 bg-slateGray bg-opacity-90 min-h-screen max-h-screen z-10 w-1/4 flex justify-center items-start p-4 mt-16 overflow-y-scroll'>
      <div className='w-full bg-white text-black rounded-md overflow-y-scroll'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold p-4'>Shopping Cart</h1>
          <button
            className='mr-8 font-bold'
            onClick={() => setCartModal(false)}>
            X
          </button>
        </div>

        {products?.map((item, index) => (
          <div
            className='p-4 flex space-x-6 border-b border-b-slateGray mb-10'
            key={index}>
            <img
              src={`http://localhost:1234/${item.image}`}
              alt=''
              className='w-40 h-40 rounded-md '
            />
            <div>
              <h2 className='text-xl font-semibold uppercase'>{item.name}</h2>
              <p className='text-md text-red'>${item.price}</p>
              <p>{item.description}</p>
              <button className='bg-slateGray mt-2 p-1 px-3 rounded-sm text-white'>
                {item.quantity}
              </button>
              <br />
              <button
                onClick={() => handleRemove(item._id)}
                className=' mt-6 bg-orang px-4 py-2 rounded-sm text-white hover:text-black'>
                Remove
              </button>
            </div>
          </div>
        ))}
        <h1 className='text-2xl font-bold text-center'>TOTAL: ${total}</h1>
      </div>
    </div>
  );
};

export default AddtoCart;
