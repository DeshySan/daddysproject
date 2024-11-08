import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsUnder50 = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        const filteredProducts = data.getProducts.filter(
          (item) => item.price < 55
        );

        setProducts(filteredProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className='flex justify-center items-center w-full sm:flex-wrap'>
      {products?.slice(0, 5).map((item) => (
        <div className='flex flex-col items-center mx-3 mb-4 p-3 '>
          <img
            src={`http://localhost:1234/${item.image}`}
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
  );
};

export default ProductsUnder50;
