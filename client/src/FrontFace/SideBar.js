import React from "react";
import banner from "../assets/banner.png";
const SideBar = (openSideBar, setOpenSideBar, categories) => {
  return (
    <div className='absolute top-0 left-0 sidebar w-[80%] bg-slateGray'>
      <div className='m-2 flex justify-between'>
        <button className='bg-red p-1'>Cross Burron</button>
        <input type='text' placeholder='Search' className='w-[80%] ml-2' />
      </div>
      <div
        className='w-100% h-[180px] bg-cover'
        style={{ backgroundImage: `url(${banner})` }}></div>
      <div>
        <ul>
          {categories?.map((category) => (
            <li>
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
