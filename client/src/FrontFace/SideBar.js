import React, { useState } from "react";
import banner from "../assets/banner.png";
import axios from "axios";
import { Link } from "react-router-dom";
const SideBar = ({ openSideBar, setOpenSideBar, categories }) => {
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const fetchProducts = async (query) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/search?query=${query}`
      );
      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      if (query) {
        fetchProducts(query);
      } else {
        setProducts([]);
      }
    }, 300);
    setDebounceTimeout(timeout);
  };
  return (
    <div className='absolute top-0 left-0 sidebar w-[40%] bg-slateGray  z-50 min-h-screen'>
      <div className='m-2 flex justify-between'>
        <button className='bg-red p-2' onClick={() => setOpenSideBar(false)}>
          Close Button
        </button>
        <input
          type='text'
          placeholder='What do you feel like dinrking today?'
          value={searchQuery}
          onChange={handleInputChange}
          className='w-[80%] ml-2'
        />
      </div>
      <div
        className='w-100% h-[400px] bg-cover'
        style={{ backgroundImage: `url(${banner})` }}>
        <div className='w-[40%] ml-60 bg-black  z-50 relative opacity-90'>
          {products?.map((product) => (
            <Link to={`/product-page/${product._id}`} className='relative'>
              <div className='flex justify-between items-center p-2 m-4 border-b border-white'>
                {" "}
                <img
                  className='h-20'
                  src={
                    product.image
                      ? product.image.split("").length > 40
                        ? `data:image/png;base64, ${product.image}`
                        : `http://localhost:1234/${product.image}`
                      : "https://media.tenor.com/Rwl2AydK4z4AAAAe/not-available-fam-na.png"
                  }
                  alt=''
                />
                <p className='text-white'>{product.name}</p>
                <p className='text-white'>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='z-10 p-4'>
        <h3 className='text-center text-black text-xl font-semibold underline'>
          Products Categories
        </h3>
        <ul className='flex justify-center items-center mt-4 text-white font-xl'>
          {" "}
          <li className=''>
            {categories?.slice(0, 6).map((category) => (
              <p>{category.name}</p>
            ))}
          </li>
          <li className='ml-8'>
            {categories?.slice(6, 12).map((category) => (
              <p>{category.name}</p>
            ))}
          </li>
          <li className='ml-8'>
            {categories?.slice(12, 18).map((category) => (
              <p>{category.name}</p>
            ))}
          </li>
          <li className='ml-8'>
            {categories?.slice(18, 26).map((category) => (
              <p>{category.name}</p>
            ))}
          </li>
          <li className='ml-8'>
            {categories?.slice(26, categories.length).map((category) => (
              <p>{category.name}</p>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
