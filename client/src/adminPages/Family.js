import React, { useEffect, useState } from "react";
import Dashboard from "../FrontFace/Dashboard";
import { useCart } from "../FrontFace/useContext/CartContext";
import axios from "axios";
const item = "";
const Family = () => {
  //middle
  const [product, setProduct] = useState(null);
  //left
  const [family, setFamily] = useState(null);

  //right
  const [familyProducts, setFamilyProducts] = useState(null);

  //selected family
  const [selectedFamily0, setSelectedFamily0] = useState(null);
  const [selectedAvailableProduct, setSelectedAvailableProduct] =
    useState(null);
  //retirve products for the middle screen
  const retrieveProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      if (data.success) {
        setProduct(data.getProducts);
        console.log(familyProducts + "familyp");
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const get all families
  const getFamilies = async () => {
    try {
      const { data } = await axios.get(`/api/v1/family/get-family`);
      if (data.success) {
        setFamily(data.family);
        console.log(data.family + family);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //retrieve products which are already in family

  const handleFamilyClick = (id) => {
    setSelectedFamily0(id);
    try {
      const selectedFamily = family?.find((fam) => fam._id === id);
      // Ensure the family has a productId array
      if (selectedFamily?.productId) {
        // Filter products that match the productId in the selected family
        const filteredProducts = product?.filter((item) =>
          selectedFamily.productId.includes(item.plu)
        );
        console.log(filteredProducts + "filteredProducts");
        setFamilyProducts(filteredProducts); // Optionally set it to state if needed
      } else {
        console.log("No products found for this family");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeAvailableProducts = async (id) => {
    try {
      console.log(id);
      setSelectedAvailableProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const selectedFamily = family?.find((fam) => fam._id === selectedFamily0);
    const updatedProductId = [
      ...(selectedFamily.productId || []),
      selectedAvailableProduct,
    ];
    try {
      const { data } = await axios.put(
        `/api/v1/family/put-family/${selectedFamily0}`,
        { productId: updatedProductId }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveProducts();
    getFamilies();
  }, []);
  return (
    <Dashboard>
      <div className='flex h-screen bg-black text-white'>
        {/* Left Section - Families */}
        <div className='left w-1/4 p-5 border-r border-gray-700'>
          <h1 className='text-xl font-bold mb-4 border-b pb-2 border-gray-600'>
            Families
          </h1>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-orang'>
                <th className='px-4 py-2'>ID</th>
                <th className='px-4 py-2'>Description</th>
                <th className='px-4 py-2'>Enable</th>
              </tr>
            </thead>
            <tbody>
              {family?.map((item) => (
                <tr
                  className='hover:bg-orang transition-colors'
                  onClick={() => handleFamilyClick(item._id)}>
                  <td className='px-4 py-2'>{item.id}</td>
                  <td className='px-4 py-2'>{item.name}</td>
                  <td className='px-4 py-2 text-center'>
                    <input type='checkbox' className='cursor-pointer' />
                  </td>
                </tr>
              ))}

              {/* Additional rows can go here */}
            </tbody>
          </table>
        </div>

        {/* Center Section - Available Products */}
        <div className='center w-1/3 p-5 border-r border-gray-700'>
          <h1 className='text-xl font-bold mb-4 border-b pb-2 border-gray-600'>
            Available Products
          </h1>
          <p className='text-orang mb-4'>Some more filters here</p>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-orang'>
                <th className='px-4 py-2'>ID</th>
                <th className='px-4 py-2'>Description</th>
                <th className='px-4 py-2'>Enable</th>
              </tr>
            </thead>
            <tbody>
              {product
                ?.filter(
                  (item) =>
                    !familyProducts?.some(
                      (familyProduct) => familyProduct.plu === item.plu
                    )
                )
                .map((item) => (
                  <tr
                    className='hover:bg-orang transition-colors'
                    onClick={() => hanldeAvailableProducts(item.plu)}>
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className='px-4 py-2'>Product Name</td>
                    <td className='px-4 py-2 text-center'>
                      <input type='checkbox' className='cursor-pointer' />
                    </td>
                  </tr>
                ))}

              {/* Additional rows can go here */}
            </tbody>
          </table>
        </div>
        <div className='right w-1/9 p-5 border-r'>
          <h1 className='text-xl font-bold mb-4 border-b pb-2 border-gray-600'>
            Products In
          </h1>
          <div className=' flex flex-col justify-center items-center'>
            <button
              onClick={handleAdd}
              className='inline-flex items-center justify-center bg-slateGray text-white rounded p-2'>
              ➕
            </button>
            <button className='mt-4 inline-flex items-center justify-center bg-slateGray text-white rounded p-2'>
              〰️
            </button>
          </div>
        </div>
        {/* Right Section - Products In */}
        <div className='right w-1/3 p-5'>
          <h1 className='text-xl font-bold mb-4 border-b pb-2 border-gray-600'>
            Products In
          </h1>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-gray-400'>
                <th className='px-4 py-2'>ID</th>
                <th className='px-4 py-2'>Description</th>
                <th className='px-4 py-2'>Enable</th>
              </tr>
            </thead>
            <tbody>
              {familyProducts?.map((item) => (
                <tr className='hover:bg-orang transition-colors'>
                  <td className='px-4 py-2'>{item.plu}</td>
                  <td className='px-4 py-2'>{item.name} </td>
                  <td className='px-4 py-2 text-center'>
                    <input type='checkbox' className='cursor-pointer' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
};

export default Family;
