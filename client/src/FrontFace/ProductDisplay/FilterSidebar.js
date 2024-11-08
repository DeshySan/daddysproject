import React, { useState } from "react";

const FilterSidebar = ({ filteredProducts }) => {
  return (
    <div className='mx-10 my-5'>
      <h1 className='text-xl font-bold'>Filter Options</h1>
      <div>
        <div className='flex flex-col'>
          <label htmlFor='price-filter'></label>

          <input type='range' id='price-filter' min='0' max='500' step='10' />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
