import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { useParams } from "react-router-dom";

const SoftDrinks = () => {
  const { slug } = useParams();
  const [categoryId, SetCategoryID] = useState("");

  const FetchCategoryID = async () => {
    try {
      if (slug) {
        const { data } = await axios.get(`/api/v1/category/get-slug/${slug}`);
        if (data.success) {
          SetCategoryID(data.getCategory._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchCategoryID();
  }, [slug]);
  return (
    <div>
      <Dashboard>
        <div className='sidebar'></div>
        <div className='main'></div>
      </Dashboard>
    </div>
  );
};

export default SoftDrinks;
