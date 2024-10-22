import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/01.png";
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header className='bg-red p-1 flex flex-col md:flex-row items-center justify-between '>
        <div className='logo p-2 cursor-pointer'>
          <img
            className='h-[40px] rounded-sm ml-1'
            src='https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg'
            alt="Daddy's website"
          />
        </div>
        {/* Navigation links on the right */}
        <div className='col-span-2 md:col-span-1'>
          <ul className='grid grid-cols-3 md:grid-cols-3 gap-6'>
            <li>
              <Link to='/dont' className='text-white hover:text-tahiti-300'>
                Products
              </Link>
            </li>
            <li>
              <Link to='/category' className='text-white hover:text-gray-300'>
                Category
              </Link>
            </li>
            <li>
              <Link to='/dont' className='text-white hover:text-gray-300'>
                User
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {/* Sidebar Section */}
    </>
  );
};

export default Header;
