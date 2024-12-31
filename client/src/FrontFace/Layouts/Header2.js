import React from "react";
import { Link } from "react-router-dom";

const Header2 = () => {
  return (
    <div>
      <div className='flex min-w-auto justify-between p-4 bg-darkWhite'>
        <div className='links'>
          <ul className='flex mt-2'>
            <li>
              <Link>Home</Link>
            </li>
            <li className='ml-2'>
              <Link>Products</Link>
            </li>
            <li className='ml-2'>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
        <h1 className='font-cursive font-bold'>DADDY'S eCOMMECE</h1>
        <div className='social-media'>
          <ul className='flex justify-between items-center'>
            <li className='mr-10'>
              <Link>Login</Link>
            </li>
            <li className='mr-6'>
              <Link>
                <i class='fa-brands fa-facebook-f'></i>
              </Link>
            </li>
            <li className='mr-6'>
              <Link>
                <i class='fa-brands fa-instagram'></i>
              </Link>
            </li>
            <li className='mr-10'>
              <Link>
                <i class='fa-brands fa-threads'></i>
              </Link>
            </li>
            <li className='mr-5  p-1'>
              <Link className='flex'>
                <i class='fa-solid fa-cart-shopping'></i> <p>0</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <section className='flex p-2 bg-darkWhite items-center w-full '>
        <div className='flex flex-col p-8 w-[50%]'>
          <h1 className='font-bold text-6xl font-Roboto w-70'>
            Cheers to enjoying a good beer! 🍻
          </h1>
          <button className='inline-block mt-2 w-auto self-start p-2 px-8 rounded-2xl border border-2 font-Roboto hover:bg-black hover:text-white flex-shrink-0 w-auto'>
            Shop Now
          </button>
        </div>
        <img
          className='w-[50%] h-[700px]'
          src='https://images.pexels.com/photos/5097359/pexels-photo-5097359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
      </section>
    </div>
  );
};

export default Header2;
