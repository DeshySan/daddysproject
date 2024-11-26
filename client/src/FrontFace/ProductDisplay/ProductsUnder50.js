import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../useContext/CartContext";

const ProductsUnder50 = () => {
  const { addtoCart, showLoading, hideLoading, loading } = useCart();
  const [products, setProducts] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
  const fetchProducts = async () => {
    showLoading();
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        const filteredProducts = data.getProducts?.filter(
          (item) => item.price < 55
        );
        const bestSellingProducts = data.getProducts.sort(
          (a, b) => b.salesCount - a.salesCount
        );

        setProducts(filteredProducts);
        setBestSellers(bestSellingProducts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className='flex justify-center items-center w-full flex-wrap '>
        {products?.slice(0, 5).map((item) => (
          <div className='flex flex-col items-center mx-3 mb-4 p-3 '>
            <img
              src={
                item.image
                  ? `http://localhost:1234/${item.image}`
                  : "https://media.tenor.com/Rwl2AydK4z4AAAAe/not-available-fam-na.png"
              }
              alt='Image'
              className='w-64 h-64 object-cover  bg-white rounded-lg shadow-sm p-3'
            />
            <div className='texts text-left w-full ml-9'>
              <h3 className='text-xl'>{item.name}</h3>
              <div className='flex items-center space-x-2'>
                <p className='text-left'>${item.price}</p>
                <p className='text-center line-through text-red'>
                  ${(item.price - 2).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='relative bg-gradient-to-r from-black via-orang to-red text-white py-16 px-6 md:px-12 rounded-lg shadow-xl overflow-hidden sm:mx-[-85px]'>
        <div className='absolute inset-0 bg-black opacity-40 rounded-lg'></div>{" "}
        {/* Overlay for better readability */}
        <div className='relative max-w-screen-xl mx-auto flex flex-col items-center text-center space-y-6'>
          {/* Title */}
          <h2 className='text-5xl sm:text-6xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s'>
            🌟 Amazing Sale! Up to 70% OFF 🌟
          </h2>

          {/* Sale Description */}
          <p className='text-lg sm:text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s'>
            Grab your favorite items at unbeatable prices. This offer won't last
            long—shop now!
          </p>

          {/* CTA Button */}
          <a
            href='/shop'
            className='bg-orang text-slateGray font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn animate__delay-3s'>
            Shop Now
          </a>
        </div>
      </div>
      <div className='flex flex-col mt-10'>
        <div className='heading flex justify-center items-center'>
          <h1 className='text-4xl font-bold font-Roboto'>SHOP BEST SELLERS</h1>
        </div>
        <div className='flex justify-center items-center w-full sm:flex-wrap'>
          {bestSellers?.slice(0, 5).map((item) => (
            <div className='flex flex-col items-center mx-3 mb-4 p-3 '>
              <img
                src={`http://localhost:1234/${item.image}`}
                alt='Image'
                className='w-64 h-64 object-cover  bg-white rounded-lg shadow-sm p-3'
              />
              <div className='texts text-left w-full ml-9'>
                <h3 className='text-xl'>{item.name}</h3>
                <div className='flex items-center space-x-2'>
                  <p className='text-left line-through'>${item.price}</p>
                  <p className='text-center text-red'>
                    ${(item.price - 2).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsUnder50;
