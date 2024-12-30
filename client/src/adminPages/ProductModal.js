import axios from "axios";
import React, { useEffect, useState } from "react";
import { sweetError, sweetSuccess } from "./errorHandler";
import { useNavigate } from "react-router-dom";

const ProductModal = ({
  openModal,
  closeModal,
  productID,
  category,
  setCategory,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const [category, setCategory] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const imageBase64 = imagePreview ? imagePreview.split(",")[1] : null;
    try {
      const { data } = await axios.put(
        `/api/v1/products/update-product/${productID}`,
        {
          name,
          description,
          price,
          category,
          image: imageBase64,
        }
      );
      if (data.success) {
        sweetSuccess("Products Updated Successfully");
        navigate(0);
      }
    } catch (error) {
      console.log(
        "Update Category Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategoryList(data.category);
      }
    } catch (error) {
      sweetError(error);
    }
  };

  const getSelectedProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${productID}`
      );
      if (data.success) {
        console.log(data.getProducts);
        setName(data.getProducts.name);
        setDescription(data.getProducts.description);
        setPrice(data.getProducts.price);
        setCategory(data.getProducts.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    if (productID) {
      getSelectedProduct();
    }
  }, [productID]);

  return (
    <div>
      {openModal && (
        <div className='flex flex-col inset-0 fixed justify-center items-center bg-slateGray bg-opacity-50'>
          <div className='bg-white bg-opacity-90 rounded-lg w-[400px]'>
            <div className='heading text-center m-4'>
              <h2 className='text-2xl'>Enter the Product Details</h2>
            </div>
            <form action='' method='PUT' className='p-3'>
              <div className='mb-4'>
                <label htmlFor='product' className='block'>
                  Enter the Product Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='description'>Enter the Description</label>
                <textarea
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  type='text'
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='price'>Enter the Product Price</label>
                <input
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name='price'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='product'>Enter the Product Category</label>
                <select
                  name='category'
                  onChange={(value) => setCategory(value)}
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md
                  focus:outline-none focus:border-blue-500'
                  id=''>
                  {categoryList.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Image preview section */}
              <div className='mb-4'>
                <label
                  htmlFor='image'
                  className='block text-sm font-medium text-gray-700'>
                  Image
                </label>
                <input
                  type='file'
                  id='image'
                  name='image'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                />
              </div>
              {/* Display image preview if available */}
              {imagePreview && (
                <div className='mb-4'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-40 max-w-sm rounded-md'
                  />
                </div>
              )}
              <div className='flex items-center justify-center'>
                <button
                  type='submit'
                  onClick={updateProduct}
                  className='bg-slateGray text-white p-2 hover:bg-red focus:outline-none rounded w-[250px]'>
                  Submit
                </button>
                <button
                  onClick={closeModal}
                  className='ml-2 bg-red text-white p-2 hover:bg-slateGray focus:outline-none rounded w-[250px]'>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
