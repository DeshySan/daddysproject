import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import Category from "./adminPages/Category";
import Products from "./adminPages/Products";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/category' element={<Category />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
