import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const AdminDashboard = ({ children }) => {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        {/* SIdebar */}
        <div className='flex'>
          <aside className='md:block hidden flex  flex-col  w-48 bg-slateGray text-white text-left h-screen '>
            <button className='text-red py-2 px-6 border-b-2 border-white hover:bg-white w-full hover:text-slateGray transition duration-200 ease-in-out transform hover:scale-105'>
              Back
            </button>
            <h2 className='text-xl font-bold text-center'>Side Menu</h2>
            <ul className='p-3 text-xl'>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link>🖥️ Dashboard</Link>
              </li>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link to='/admin/category'> 🐈Category</Link>
              </li>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link to='/admin/products'> 📔 Products</Link>
              </li>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link> 👦Users</Link>
              </li>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link> 👨‍💻 rReport</Link>
              </li>
              <li className='p-2 hover:text-red hover:scale-105 transition-transform duration-300 ease-in-out'>
                <Link>📉 Statistics</Link>
              </li>
            </ul>
          </aside>

          <main className='flex-1 p-4'>
            {/* Main Area */}
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
