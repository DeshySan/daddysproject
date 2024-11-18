import React, { useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";
import { sweetError } from "./errorHandler";
import { useLocation, useNavigate } from "react-router-dom";

//in this I will implement a deboucing mechanism to prevent unwanted noise from the input which will hold the search by probably 300ms

const CreateFamily = () => {
  //useStates
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [productList, setProductList] = useState([]);
  const [pId, setPId] = useState([]);

  // New state to handle image
  const [image, setImage] = useState(null);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setImage(file); // Save the file to state
  };

  const navigate = useNavigate();
  //handleInput change for search funciton
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      if (query) {
        fetchProducts(query);
      } else {
        setProducts([]);
      }
    }, 300);
    setDebounceTimeout(timeout);
  };

  const fetchProducts = async (query) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/search?query=${query}`
      );
      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductClick = async (prod) => {
    if (!pId.includes(prod.plu)) {
      setProductList((prevList) => [...prevList, prod]);
      setPId((prevPId) => [...prevPId, prod.plu]);

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.plu !== prod.plu)
      );
    } else {
      sweetError("Product is already added");
    }
  };

  //this will be the one to act as a submit button
  const handleSave = async () => {
    if (!name || pId.length === 0 || !image) {
      console.log("Name, PLU List or Image is missing");
      return;
    }

    // Create a new FormData object to send the data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("productId", pId);
    formData.append("image", image); // Add image file to the form data

    try {
      const { data } = await axios.post(
        `/api/v1/family/post-family`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (data.success) {
        navigate("/family"); // Navigate after successful save
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminDashboard>
      <div className='flex w-full'>
        <div className='flex justify-center items-center flex-col w-1/2'>
          <div className='heading'>
            <h1 className='text-4xl font-semibold capitalize '>
              Create A Family
            </h1>
          </div>
          <div className='form w-full flex justify-center flex-col items-center'>
            <div className='mb-2 flex flex-col w-1/3'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-black p-3 rounded-md text-center'
              />
            </div>
            <div className='mb-2 flex flex-col w-1/3'>
              <label htmlFor='name'>Products</label>
              <input
                type='text'
                name='Search'
                placeholder='Search for Products'
                className='border border-black p-3 rounded-md text-center'
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2 flex flex-col w-1/3'>
              <label htmlFor='image'>Upload Image</label>
              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={handleImageChange}
                className='border border-black p-3 rounded-md text-center'
              />
            </div>
            <div className='mb-2 flex w-1/3 flex-col  items-center'>
              <button
                onClick={handleSave}
                className='bg-red w-full p-2 rounded-md text-white text-xl hover:scale-105'>
                Save
              </button>
            </div>
            <div className='box mb-2 flex flex-col w-1/3'>
              <ul>
                {products?.map((item) => (
                  <li
                    onClick={() => handleProductClick(item)}
                    className='text-left bg-orang p-3 rounded-md hover:cursor-pointer flex justify-between mt-4 '>
                    <span>{item.plu}</span>{" "}
                    <p className='animate-slide-left-to-right'>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='div flex justify-center items-center flex-col w-1/2'>
          {productList?.map((item, index) => (
            <p key={index} className='mt-4 mb-4'>
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default CreateFamily;
