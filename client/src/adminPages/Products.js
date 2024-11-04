import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";
import { sweetError } from "./errorHandler";
import ProductModal from "./ProductModal";

const Products = () => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState({});
  const retrieveProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        setProduct(data.getProducts);

        const categoryPromises = data.getProducts.map((product) =>
          fetchCategory(product.category)
        );
        await Promise.all(categoryPromises);
      } else {
        sweetError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async (categoryID) => {
    if (categories[categoryID]) return;
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-single/${categoryID}`
      );

      setCategories((prevCategories) => ({
        ...prevCategories,
        [categoryID]: data.getCategory.name,
      }));
    } catch (error) {
      console.error(`Error fetching category ${categoryID}:`, error);
    }
  };
  useEffect(() => {
    retrieveProducts();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  //opening and closign of a modal
  const [openModal, setOpenModal] = useState(false);

  const closeModal = async () => {
    setOpenModal(false);
  };

  const popModal = async () => {
    setOpenModal(true);
  };
  return (
    <AdminDashboard>
      <div className='flex justify-center'>
        <button
          type='submit'
          className='bg-slateGray w-[900px] p-3 text-white rounded-md hover:bg-red transition mt-4'>
          Add a Product
        </button>
      </div>
      <div className='mt-8'>
        <table className='min-w-full'>
          <thead className='text-center bg-lightSlateGray'>
            <tr>
              <th className='py-2'>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center '>
            {product &&
              product.map((value, index) => (
                <>
                  <tr className='shadow-sm'>
                    <td className='py-2'>{index + 1}</td>
                    <td>{}</td>
                    <td>{value.description}</td>
                    <td>{value.price}</td>
                    <td>
                      {categories[value.category]
                        ? categories[value.category]
                        : "Loading..."}
                    </td>

                    <td>
                      <button
                        onClick={() => popModal()}
                        className='bg-limeGreen hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Edit
                      </button>
                      <button className='bg-red hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
      <ProductModal openModal={openModal} closeModal={closeModal} />
    </AdminDashboard>
  );
};

export default Products;
