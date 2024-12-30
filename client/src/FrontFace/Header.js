import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "./useContext/CartContext";
import { logout } from "../Redux/authslice";
import AddtoCart from "./useContext/AddtoCart";
import axios from "axios";
import SideBar from "./SideBar";
import GetSuburbLocation from "./GetSuburbLocation";

const Header = () => {
  // States
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const { totalQuantity, showLoading, hideLoading, loading } = useCart();
  const [cartModal, setCartModal] = useState(false); // Add state to control cart visibility
  const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown visibility

  // Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Set active category
  const handleLinkClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Fetch categories
  const getCategory = async () => {
    showLoading();
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category?limit=${999}`
      );

      const response = await axios.get(
        `/api/v1/products/get-product?limit=${10000}`
      );

      if (data.success) {
        const productCategories = response.data.getProducts.map((product) =>
          product.price >= 3 ? product.category : ""
        );
        const filteredCat = data.category.filter((catty) =>
          productCategories.includes(catty._id)
        );

        setCategories(filteredCat);
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

  // Event handlers to toggle dropdown visibility
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  const [counter, setCounter] = useState(0);
  const location = useMemo(() => {
    return <GetSuburbLocation />;
  }, counter);
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className='relative z-20 overflow-y-scroll'>
      <div className='bg-darkWhite flex justify-between fixed top-0 left-0 right-0 p-3'>
        <div className='ml-[100px]'>
          <p
            className='text-4xl hover:cursor-pointer'
            onClick={() => setOpenSideBar(true)}>
            🍔
          </p>
          {openSideBar && (
            <SideBar
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
              categories={categories}
            />
          )}
        </div>
        <div>
          <Link to='/'>
            <h1 className='font-cursive text-3xl font-bold'>
              Liquor <span className='text-orang'>Shop</span>
            </h1>
          </Link>
        </div>
        <div className='hidden md:flex mr-[100px]'>
          <ul className='flex space-x-6 group hover-cursor'>
            {isAuthenticated ? (
              <div
                className='relative flex'
                // Hide dropdown when mouse leaves user section
              >
                <h1 className='group hover-cursor text-red font-semibold p-1'>
                  {user.fullName.charAt(0).toUpperCase() +
                    user.fullName.slice(1)}{" "}
                  :
                </h1>

                <Link
                  to='/logout'
                  className='hover:bg-orang hover:text-white rounded-lg text-center p-1'
                  onClick={handleLogout}>
                  : Logout
                </Link>
                {/* Conditional dropdown */}
                {showDropdown && (
                  <div className='absolute bg-darkWhite z-10 shadow-lg mt-2 rounded'>
                    <li className='hover:bg-white p-4 font-medium'>
                      <Link to='/settings'>Settings</Link>
                    </li>
                    <li className='hover:bg-white p-4 font-medium'>
                      <Link to='/logout' onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                    <li className='hover:bg-white p-4 font-medium'>
                      <Link to='/preferences'>Preferences</Link>
                    </li>
                  </div>
                )}
              </div>
            ) : (
              <li className='mr-4'>
                <Link to='/member-login'>Login</Link>
              </li>
            )}
            <li className='mr-4 flex p-1'>
              <Link className='flex'>
                <h1 className='font-bold'>🏚️ :</h1> : {location}
              </Link>
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
      <div className='hidden relative mt-16 flex justify-center items-center md:block z-10 bg-orang'>
        <ul className='flex flex-wrap justify-center text-center'>
          {categories?.slice(0, 12).map((category) => (
            <li className='ml-9 mb-2 sm:mb-0' key={category._id}>
              <Link
                to={`/daddy/${category.slug}`}
                onClick={() => handleLinkClick(category._id)}
                className={`${
                  activeCategory === category._id ? "text-orang" : "text-black"
                } hover:text-calmGreen font-sourGummy text-l`}>
                | {category.name} |
              </Link>
            </li>
          ))}
          <li className='ml-9 mb-2 sm:mb-0'>
            <Link
              TO='/gift-cards'
              className='font-sourGummy font-semibold text-red hover:text-calmGreen'>
              | Gift Cards |
            </Link>
          </li>
          <li className='ml-9 mb-2 sm:mb-0'>
            <Link
              to='/weekly-vouchers'
              className='font-sourGummy font-semibold text-red hover:text-calmGreen'>
              | VOUCHERS THIS WEEK |
            </Link>
          </li>
        </ul>
      </div>

      {/* Conditionally render AddtoCart component */}
      {cartModal && <AddtoCart setCartModal={setCartModal} />}
    </div>
  );
};

export default Header;
