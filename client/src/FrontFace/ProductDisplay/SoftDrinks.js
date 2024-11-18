import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";

const SoftDrinks = () => {
  const { slug } = useParams();
  const [categoryId, SetCategoryID] = useState("");
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRanges: [],
  });
  const FetchCategoryID = async () => {
    try {
      if (slug) {
        const { data } = await axios.get(`/api/v1/category/get-slug/${slug}`);
        if (data.success) {
          SetCategoryID(data.getCategory._id);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        // Filter products by category
        const filteredProducts = data.getProducts.filter((item) => {
          const isCategoryMatch = item.category === categoryId;

          // Price range filter
          const isPriceMatch =
            filters.priceRanges.length === 0 || // If no price range selected, include all products
            filters.priceRanges.some(
              ([min, max]) => item.price >= min && item.price <= max
            );

          return isCategoryMatch && isPriceMatch;
        });

        setCategoryProduct(filteredProducts); // Set filtered products
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, filters]);

  useEffect(() => {
    setLoading(true);
    FetchCategoryID();
  }, [slug]);

  return (
    <div>
      <Dashboard>
        <div className='flex banner bg-darkWhite justify-center items-center flex-col my-2 p-5 '>
          <h1 className='text-2xl font-semibold font-Roboto'>All Product</h1>
          <div className='link mt-3'>
            <Link className='ml-2'>Home /</Link>
            <Link className='ml-2'>About /</Link>
            <Link className='ml-2'>Details /</Link>
            <Link className='ml-2 text-red'>{slug && slug}</Link>
          </div>
        </div>
        <div className='border '></div>
        <div className='flex m-10 border border-darkWhite rounded-lg overflow-hidden '>
          <div className='sidebar w-[200px] p-5  '>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          {loading ? (
            <div className='flex justify-center items-center w-full h-[calc(100vh-200px)]'>
              <div className='w-24 h-24 border-8 border-t-transparent border-slateGray border-solid rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='flex  justify-center items-center w-full sm:flex-wrap'>
              {categoryProduct &&
                categoryProduct?.map((item) => (
                  <div className='flex flex-col items-center mx-3 mb-4 p-3 relative'>
                    <Link to={`/product-page/${item._id}`}>
                      <img
                        src={`http://localhost:1234/${item.image}`}
                        alt='Image'
                        className='w-[300px] h-[400px] object-cover  bg-white rounded-lg shadow-sm p-3'
                      />
                    </Link>
                    <button className='orang'>Add to Cart</button>
                    <div className='texts text-left w-full ml-9'>
                      <h3 className='text-xl'>{item.name}</h3>
                      <div className='flex items-center space-x-2'>
                        <p className='text-left'>${item.price}</p>
                        <p className='text-center line-through text-red'>
                          ${(item.price - 2).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Dashboard>
    </div>
  );
};

export default SoftDrinks;
