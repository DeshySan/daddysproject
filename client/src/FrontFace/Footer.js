import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className='bg-gradient-to-r from-orang to-red text-black py-12 mt-8'>
        <div className='container mx-auto px-6'>
          {/* Top Section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {/* Shop Categories */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Shop Categories</h2>
              <ul className='space-y-2 text-gray-400'>
                <li>Men's Clothing</li>
                <li>Women's Clothing</li>
                <li>Electronics</li>
                <li>Home & Living</li>
                <li>Beauty Products</li>
                <li>Sports & Outdoors</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Support</h2>
              <ul className='space-y-2 text-gray-400'>
                <li>Help Center</li>
                <li>Track Your Order</li>
                <li>Shipping & Delivery</li>
                <li>Returns & Refunds</li>
                <li>FAQs</li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Our Policies</h2>
              <ul className='space-y-2 text-gray-400'>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Refund Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Contact Info</h2>
              <ul className='space-y-2 text-gray-400'>
                <li>Phone: +1 800 123 4567</li>
                <li>Email: support@ecommerce.com</li>
                <li>Address: 123 E-Commerce St, Shopping City</li>
              </ul>
              <div className='mt-4'>
                <h3 className='text-lg font-medium mb-2'>Follow Us</h3>
                <div className='flex space-x-4'>
                  <a href='#' className='hover:text-blue-400'>
                    Facebook
                  </a>
                  <a href='#' className='hover:text-blue-500'>
                    Twitter
                  </a>
                  <a href='#' className='hover:text-red-500'>
                    Instagram
                  </a>
                  <a href='#' className='hover:text-blue-600'>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>
                Subscribe to Newsletter
              </h2>
              <p className='text-gray-400 mb-4'>
                Get updates on exclusive deals, new arrivals, and more!
              </p>
              <form className='flex flex-col space-y-3'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='p-2 rounded-md text-black'
                />
                <button className='bg-slateGray hover:bg-orang text-white py-2 px-4 rounded-md hover:scale-105'>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='mt-12 border-t border-gray-700 pt-6 text-center text-gray-400'>
            <p>
              &copy; {new Date().getFullYear()} E-Commerce Inc. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
