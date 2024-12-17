import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import { useCart } from "../useContext/CartContext";
import { useSelector } from "react-redux";

const SoftDrinks = () => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  //import add to cart from usecart
  const { addtoCart } = useCart();
  const [quantity, setQuantity] = useState(1);
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
      const { data } = await axios.get(
        `/api/v1/products/get-product?limit=${99999}`
      );
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
        console.log(data);

        setCategoryProduct(filteredProducts); // Set filtered products
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (product) {
      addtoCart({ ...product, quantity: parseInt(quantity) });
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
                    <Link to={`/product-page/${item._id}`} className='relative'>
                      <img
                        src={
                          item.image
                            ? item.image.split("").length > 40
                              ? `data:image/png;base64, ${item.image}`
                              : `http://localhost:1234/${item.image}`
                            : "https://media.tenor.com/Rwl2AydK4z4AAAAe/not-available-fam-na.png"
                        }
                        alt='Image'
                        className='w-[300px] h-[400px] object-cover  bg-white rounded-lg shadow-sm p-3'
                      />
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className='bg-orang w-[250px] absolute bottom-16 p-2 rounded-md text-white'>
                      Add to Cart
                    </button>
                    <div className='texts text-left w-full ml-9'>
                      <h3 className='text-xl'>{item.name}</h3>
                      <div className='flex justify-center flex items-center space-x-2'>
                        <h3 className='text-center text-l font-semibold'>
                          Members Price Only at
                        </h3>
                        {isAuthenticated ? (
                          <p className='text-left text-xl font-semibold'>
                            ${item.price > 0 && item.price - 2}
                          </p>
                        ) : (
                          <>
                            {" "}
                            <p className='text-center line-through text-red'>
                              ${(item.price + 3).toFixed(2)}
                            </p>
                          </>
                        )}
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
