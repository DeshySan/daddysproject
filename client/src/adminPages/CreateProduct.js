import axios from "axios";
import e from "cors";
import React, { useEffect, useState } from "react";

const CreateProduct = ({ openCreateProduct, setOpenCreateProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  //handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Set the image file in state
      setImage(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded)
    }
  };
  //add a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.post(
        `/api/v1/products/post-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        console.log(`Congratulations` + data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    const { data } = await axios.get(`/api/v1/category/get-category`);
    console.log(data.category);
    setCategories(data.category);
    data.category.map((cat) => {
      console.log(cat._id);
    });
  };

  //handle to close button
  const handleCloseModal = async (e) => {
    e.preventDefault();
    setOpenCreateProduct(false);
  };
  useEffect(() => {
    getCategory();
  }, []);

  //image
  return (
    <div>
      <div className='flex  fixed inset-0 justify-center items-center bg-slateGray bg-opacity-50 overflow-scroll'>
        <div className='bg-white bg-opacity-90 rounded-md p-4 w-[400px] overflow-auto max-h-[90vh]'>
          <div className='heading text-center'>
            <h2 className='text-4xl font-poppins font-semibold text-slateGray'>
              Create A Product
            </h2>
          </div>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-4 '>
              <label htmlFor='name' className='block text-slateGray'>
                Enter the Product Name
              </label>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                name='name'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4 '>
              <label htmlFor='name' className='block text-slateGray'>
                Enter the Product Description
              </label>
              <textarea
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name='description'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4 '>
              <label htmlFor='name' className='block text-slateGray'>
                Enter the Product Price
              </label>
              <input
                type='number'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                name='price'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='product'>Enter the Product Category</label>
              <select
                name='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md
                  focus:outline-none focus:border-blue-500'
                id=''>
                <option value=''>Select a category</option>
                {categories?.map((item) => (
                  <option value={item._id}>{item.name}</option>
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
                  className='w-full max-w-sm rounded-md'
                />
              </div>
            )}
            <div className='flex'>
              <button
                type='submit'
                className='bg-limeGreen p-3 text-white rounded-sm'>
                Submit
              </button>

              <button
                type='button'
                onClick={handleCloseModal}
                className='bg-red ml-3 p-3 rounded-sm w-[80px] text-white'>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
