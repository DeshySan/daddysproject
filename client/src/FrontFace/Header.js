import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sweetError } from "../adminPages/errorHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "./useContext/CartContext";
import { logout } from "../Redux/authslice";
import AddtoCart from "./useContext/AddtoCart";

const Header = () => {
  // States
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const { totalQuantity, showLoading, hideLoading } = useCart();
  const [cartModal, setCartModal] = useState(false); // Add state to control cart visibility

  // Redux
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );

  // Set active category
  const handleLinkClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Fetch categories
  const getCategory = async () => {
    showLoading();
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  // Logout
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='relative z-20 overflow-y-scroll'>
      <div className='bg-darkWhite flex justify-between fixed top-0 left-0 right-0  p-3'>
        <div className='nepal'>
          <p className='text-4xl'>🍔</p>
        </div>
        <div>
          <Link to='/'>
            <h1 className='font-cursive text-3xl font-bold'>
              Liquor <span className='text-orang'>Shop</span>
            </h1>
          </Link>
        </div>
        <div className='hidden md:flex'>
          <ul className='flex space-x-6 group hover-cursor'>
            {isAuthenticated ? (
              <div className='hover-cursor'>
                <h1 className='group hover-cursor'>
                  {user.fullName.charAt(0).toUpperCase() +
                    user.fullName.slice(1)}
                </h1>
                <div className='hidden absolute group-hover:block bg-darkWhite z-10'>
                  <li className='hover:bg-white p-4 font-medium'>
                    <Link to='/settings'>Settings</Link>
                  </li>
                  <li className='hover:bg-white p-4 font-medium'>
                    <Link to='/logout' onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </div>
              </div>
            ) : (
              <li className='mr-4'>
                <Link to='/member-login'>Login</Link>
              </li>
            )}
            <li className='mr-4'>
              <Link>Create Account</Link>
            </li>
            <li className='mr-4'>🔍</li>
            {/* Cart icon */}
            <li className='mr-4'>
              <button
                onClick={() => setCartModal(!cartModal)}
                className='relative'>
                🛍️
                {totalQuantity > 0 && (
                  <span className='absolute top-2 right-0 bg-slateGray text-orang text-xs rounded-full px-2 py-1'>
                    {totalQuantity}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
        {/* Mobile Menu */}
        <div className='md:hidden flex items-center'>
          <ul className='flex space-x-4'>
            <li>
              <Link className='text-lg' to='/member-login'>
                Login
              </Link>
            </li>
            <li>
              <Link className='text-lg'>Create Account</Link>
            </li>
            <li>🔍</li>
            <li>
              <Link className='text-lg'>
                🛍️
                {totalQuantity > 0 && (
                  <span className='absolute top-2 right-0 bg-slateGray text-red text-xs rounded-full px-2 py-1'>
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Categories */}
      <div className='hidden relative mt-16 flex justify-center items-center md:block z-50'>
        <ul className='flex flex-wrap justify-center text-center'>
          {categories?.map((category) => (
            <li className='ml-9 mb-2 sm:mb-0' key={category._id}>
              <Link
                to={`/daddy/${category.slug}`}
                onClick={() => handleLinkClick(category._id)}
                className={`${
                  activeCategory === category._id ? "text-orang" : "text-black"
                } hover:text-orang font-sourGummy text-l`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Conditionally render AddtoCart component */}
      {cartModal && <AddtoCart setCartModal={setCartModal} />}
    </div>
  );
};

export default Header;
