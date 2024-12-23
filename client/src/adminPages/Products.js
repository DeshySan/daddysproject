import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import axios from "axios";
import { sweetError } from "./errorHandler";
import ProductModal from "./ProductModal";
import CreateProduct from "./CreateProduct";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchName, setBatchName] = useState("");
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState(null);
  const [productID, setProductID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const limit = 14; // Items per page

  // Handle page changes
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      fetchProducts(query);
    } else {
      setProduct([]);
    }
  };
  const fetchProducts = async (query) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/search?query=${query}`
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const retrieveProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        setProduct(data.getProducts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
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
    console.log(categoryID + " this is catID");
    if (!categoryID) return;
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

  useEffect(() => {}, [categories]);

  //opening and closign of a modal
  const [openModal, setOpenModal] = useState(false);

  const closeModal = async () => {
    setOpenModal(false);
  };

  const popModal = async () => {
    setOpenModal(true);
  };

  //create Product Modal
  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  const openProductModal = async () => {
    setOpenCreateProduct(true);
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/adminAPI/get-products?batch=${batchName}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDeletion = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/adminAPI/delete-batch-products`,
        {
          data: { batch: batchName },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminDashboard>
      <div className='flex justify-center items-center flex-col'>
        <div>
          <input
            type='text'
            placeholder='Batch Name'
            className='border border-orang p-1'
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
          <button className='bg-orang text-white p-2' onClick={handleProducts}>
            Get products from Back Office
          </button>
        </div>
        <div>
          <input
            type='text'
            placeholder='Batch Name'
            className='border border-orang p-1'
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
          <button
            onClick={handleProductDeletion}
            className='bg-slateGray text-white p-2 ml-4'>
            Delete All Products
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => setOpenCreateProduct(true)}
          type='submit'
          className='bg-slateGray w-[900px] p-3 text-white rounded-md hover:bg-red transition mt-4'>
          Add a Product
        </button>
      </div>
      <div>
        {openCreateProduct && (
          <CreateProduct
            openCreateProduct={openCreateProduct}
            setOpenCreateProduct={setOpenCreateProduct}
          />
        )}
      </div>
      <div>
        <input
          type='text'
          placeholder='Search for Products By name or Description '
          className='block w-full border-b mt-2'
          value={searchQuery}
          onChange={handleInputChange}
        />
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
                    <td>{value.name}</td>
                    <td>{value.description}</td>
                    <td>${value.price}</td>
                    <td>
                      {categories[value.category]
                        ? categories[value.category]
                        : "Loading"}
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          popModal();
                          setProductID(value._id);
                          setCategory(categories[value._id]);
                        }}
                        className='bg-limeGreen hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(value._id);
                        }}
                        className='bg-red hover:text-blue-700 mr-2 focus:outline-none px-4 py-2'>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <div>
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
      </div>
      <ProductModal
        openModal={openModal}
        closeModal={closeModal}
        productID={productID}
        category={category}
        setCategory={setCategory}
      />
    </AdminDashboard>
  );
};

export default Products;
