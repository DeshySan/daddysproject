import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sweetError } from "../adminPages/errorHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "./useContext/CartContext";
// import { logout } from "../../Redux/authslice";
import { logout } from "../Redux/authslice";
const Header = () => {
  //useStates
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const { totalQuantity, showLoading, hideLoading } = useCart();

  //redux
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );
  //set the active category to red
  const handleLinkClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  const getCategory = async () => {
    showLoading();
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(totalQuantity + "header");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  //logout
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className='bg-darkWhite flex justify-between  p-3 '>
        <div className='nepal'>
          <p className='text-4xl'>🍔</p>
        </div>
        <div>
          <Link to='/'>
            {" "}
            <h1 className='font-cursive text-3xl font-bold'>
              Liquor <span className='text-orang'>Shop</span>
            </h1>
          </Link>
        </div>
        <div className='hidden md:flex  '>
          <ul className='flex space-x-6 group hover-cursor'>
            {isAuthenticated ? (
              <div className='hover-cursor'>
                <h1 className='group hover-cursor'>
                  {user.fullName.charAt(0).toUpperCase() +
                    user.fullName.slice(1, user.fullName.length)}
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
            <li className='mr-4'>
              <Link>
                🛍️
                {totalQuantity > 0 && (
                  <span className='absolute top-2 right-0 bg-slateGray text-orang text-xs rounded-full px-2 py-1'>
                    {totalQuantity}
                  </span>
                )}
              </Link>
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
      <div className='hidden flex justify-center items-center md:block'>
        <ul className='flex flex-wrap justify-center text-center'>
          {categories?.map((category) => (
            <li className='ml-9 mb-2 sm:mb-0'>
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
    </>
  );
};

export default Header;
