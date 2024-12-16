import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";
import Swal from "sweetalert2";
import CreateCategory from "./CreateCategory";
import { current } from "@reduxjs/toolkit";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const limit = 14; // Items per page
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //error handler
  const sweetError = (err) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  };
  //success handler
  const sweetSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: msg,
    });
  };
  //get all categories
  const getAllCategory = async (currentPage) => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category?page=${currentPage}&limit=${limit}`
      );
      if (data.success) {
        console.log(data);
        setCategories(data.category);
        closeModal();
        setCategory("");
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      sweetError(error);
    }
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //update categories

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${category}`,
        { name }
      );

      if (data.success) {
        sweetSuccess(data.message);
        setName("");
        getAllCategory();
      } else {
        sweetError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(
        "Update Category Error:",
        error.response ? error.response.data : error.message
      );
      sweetError(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  //post the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/category/post-category`, {
        name,
      });
      if (data.success) {
        sweetSuccess(data.message);
        getAllCategory();
      } else {
        sweetError(data.message);
      }
    } catch (error) {
      console.log(
        "Update Category Error:",
        error.response ? error.response.data : error.message
      );
      sweetError(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  const getEditName = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-single/${id}`);
      if (!data.success) {
        alert("Something wrong");
      } else {
        setName(data.getCategory.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category//delete-category/${id}`
      );

      if (data.success) {
        sweetSuccess(data.message);
        getAllCategory();
      } else {
        sweetError(data.message);
      }
    } catch (error) {
      console.log(error);
      sweetError(error);
    }
  };
  useEffect(() => {
    getAllCategory(currentPage);
  }, [currentPage]);
  return (
    <div>
      <AdminDashboard>
        <CreateCategory
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
        <table className='min-w-full rounded-lg shadow-md text-center'>
          <thead className='bg-lightSlateGray '>
            <tr>
              <th className='py-2 px-4 text-center text-sm font-semibold text-gray-600'>
                ID
              </th>
              <th className='py-2 px-4 text-center text-sm font-semibold text-gray-600'>
                Name
              </th>
              <th className='py-2 px-4 text-center text-sm font-semibold text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((c, index) => (
                <>
                  <tr className=' shadow-sm'>
                    <td key={c._id}>{index + 1}</td>
                    <td>{c.name}</td>
                    <td className='py-2 px-4 text-sm'>
                      <button
                        onClick={() => {
                          openModal();
                          {
                            getEditName(c._id);
                            setCategory(c._id);
                          }
                        }}
                        className='bg-limeGreen hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className='bg-red hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <div className='flex justify-between mt-2'>
          {/* <button
            onClick={() => handlePageChange(index + 1)}
            className='p-2 px-2 bg-slateGray'>
            Previous
          </button>
          <button
            className='p-2 px-3 bg-orang'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Next
          </button> */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-orang text-white"
                  : "bg-slateGray"
              }`}>
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 bg-lightSlateGray rounded disabled:opacity-50'>
            Next
          </button>
        </div>
        {/* Modal */}
        {/* Modal Background */}
        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-slateGray bg-opacity-50'>
            {/* Modal Content */}
            <div className='bg-white p-8 rounded-lg w-96'>
              <h2 className='text-2xl font-bold mb-4'>Enter Your Details</h2>

              {/* Form */}
              <form action='#' method='PUT'>
                <div className='mb-4'>
                  <label htmlFor='category' className='block text-gray-700'>
                    Category Name
                  </label>
                  <input
                    type='text'
                    id='category'
                    name='category'
                    value={editName ? editName : name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    placeholder='Gym Supplies'
                  />
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  onClick={updateCategory}
                  className='w-full bg-limeGreen text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                  Submit
                </button>
              </form>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className='mt-4 bg-red py-2 px-2 rounded-lg text-white hover:text-white focus:outline-none'>
                Close
              </button>
            </div>
          </div>
        )}
      </AdminDashboard>
    </div>
  );
};

export default Category;
