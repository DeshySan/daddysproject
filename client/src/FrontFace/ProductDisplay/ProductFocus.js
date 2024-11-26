import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../useContext/CartContext";
import availability from "../../assets/availability.jpg";
const ProductFocus = () => {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const { addtoCart, showLoading, hideLoading, loading } = useCart();

  const handleAddToCart = () => {
    if (product) {
      // Add the product to the cart with the selected quantity
      console.log(product + `product`);
      addtoCart({ ...product, quantity: parseInt(quantity) });
    }
  };
  const getOneProduct = async () => {
    showLoading();
    try {
      console.log(`Loading is ` + loading);
      const { data } = await axios.get(`/api/v1/products/get-product/${id}`);
      if (data.success) {
        setProduct(data.getProducts);
        setCategory(data.getProducts.category);
        getAllProducts(data.getProducts.category);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  const getAllProducts = async (category) => {
    // in the future, I can filter this in the server side to make it process much smoothly
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);

      const filterProduct = data.getProducts.filter(
        (product) => product.category == category
      );
      setProducts(filterProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOneProduct();
  }, []);
  useEffect(() => {
    getOneProduct();
  }, [id]);
  return (
    <Dashboard>
      <div className='bg-gradient-to-r from-orang via-purple-500 to-indigo-500 text-white p-4 flex items-center justify-center overflow-hidden'>
        <div className='flex items-center space-x-4 animate-marquee'>
          <span className='text-2xl font-bold text-yellow-300'>
            ✨ FLASH SALE ALERT! ✨
          </span>
          <span className='text-xl md:text-2xl font-semibold text-black'>
            Enjoy{" "}
            <span className='text-4xl font-extrabold text-yellow-400'>
              25% OFF
            </span>{" "}
            Everything!
          </span>
          <span className='text-sm md:text-base text-slateGray'>
            🛍️ Shop your favorites today & save big! 🛒
          </span>
        </div>
      </div>
      {/* starts the product are */}

      <div className='flex  w-full justify-center my-8'>
        <div className='flex w-full max-w-6xl space-x-8'>
          {/* Image section - 50% of the container */}
          {product?.image ? (
            <div className='picture w-1/2'>
              <img
                className='h-[700px] w-full object-contain rounded-lg'
                src={`http://localhost:1234/${product?.image}`}
                alt='Whiskey'
              />
            </div>
          ) : (
            <div className='picture w-1/2'>
              <img
                className='h-[700px] w-full object-contain rounded-lg'
                src={availability}
                alt='Whiskey'
              />
            </div>
          )}

          <div className='product-details w-1/2  flex flex-col '>
            <h2 className='text-2xl font-Roboto p-2 font-bold'>
              {product?.name}
            </h2>
            <p className='text-xl p-2'>
              ${product?.price}
              <span className='text-red ml-3'>${product?.price - 3}</span>
            </p>
            <h1 className='text-xl font-semibold p-2'>About this Product</h1>
            <p className='p-2'>{product?.description}</p>
            <p>{product?._id}</p>
            <button
              onClick={handleAddToCart}
              disabled={!product}
              className='bg-black text-white p-4 w-1/4 mt-4 rounded-sm hover:bg-orang hover:text-black font-semibold hover:scale-105'>
              Add to Cart
            </button>
            <div className='flex flex-col mt-10'>
              <h2 className='text-center font-semibold text-2xl'>
                You might also like
              </h2>

              <div className='flex flex-row '>
                {products?.slice(0, 3).map((item) => (
                  <Link
                    to={`/product-page/${item._id}`}
                    key={item._id}
                    className='relative flex s-center justify-center ml-5'>
                    <div className='recc'>
                      <img
                        src={
                          item.image
                            ? `http://localhost:1234/${item.image}`
                            : "https://media.tenor.com/Rwl2AydK4z4AAAAe/not-available-fam-na.png"
                        }
                        alt=''
                        className='h-[250px] w-[200px] mt-4 ml-5 object-contain shadow-lg'
                      />
                      <button
                        onClick={() => handleAddToCart(item)}
                        className='bg-orang w-[120px] ml-16 absolute bottom-6 p-1 rounded-md text-white'>
                        Add to Cart
                      </button>
                      <p className='text-left ml-5'>{item?.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProductFocus;
