import React, { useState } from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const priceRanges = [
    { label: "0 - 50", value: [0, 50] },
    { label: "51 - 100", value: [51, 100] },
    { label: "101 - 200", value: [101, 200] },
    { label: "201 - 500", value: [201, 500] },
    { label: "500+", value: [500, Infinity] },
  ];

  const handlePriceChange = (event) => {
    const { value, checked } = event.target;
    const [minPrice, maxPrice] = value.split("-").map(Number);

    // If checkbox is checked, add the range to the filters
    setFilters((prevFilters) => {
      const updatedPriceRanges = checked
        ? [...prevFilters.priceRanges, [minPrice, maxPrice]]
        : prevFilters.priceRanges.filter(
            (range) => !(range[0] === minPrice && range[1] === maxPrice)
          );
      return { ...prevFilters, priceRanges: updatedPriceRanges };
    });
  };
  return (
    <div className='filter-sidebar bg-white p-5 rounded-lg shadow-lg w-64'>
      <h3 className='text-center text-2xl font-semibold text-gray-800 mb-4'>
        Filters
      </h3>

      <div className='mt-4'>
        <h4 className='text-lg font-semibold text-gray-700 mb-2'>
          Price Range
        </h4>
        <div className='space-y-2'>
          {priceRanges.map(({ label, value }) => (
            <div key={label} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                value={value.join("-")}
                checked={filters.priceRanges.some(
                  (range) => range[0] === value[0] && range[1] === value[1]
                )}
                onChange={handlePriceChange}
                className='h-4 w-4 border-gray-400 rounded hover:cursor-pointer focus:ring-2 focus:ring-blue-500'
              />
              <label className='text-gray-700 cursor-pointer'>{label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
