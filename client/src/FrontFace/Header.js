import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sweetError } from "../adminPages/errorHandler";
import axios from "axios";
import { useSelector } from "react-redux";

const Header = () => {
  //useStates
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  //redux
  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );
  //set the active category to red
  const handleLinkClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  const getCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
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
          <ul className='flex space-x-6'>
            {isAuthenticated ? (
              <h1>{user.fullName}</h1>
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
              <Link>🛍️</Link>
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
              <Link className='text-lg'>🛍️</Link>
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
