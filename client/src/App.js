import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import Category from "./adminPages/Category";
import Products from "./adminPages/Products";
import Dashboard from "./FrontFace/Dashboard";
import HomePage from "./FrontFace/ProductDisplay/HomePage";
import SoftDrinks from "./FrontFace/ProductDisplay/SoftDrinks";
import MemberRegister from "./FrontFace/MemberLogin/MemberRegister";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/category' element={<Category />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/daddy/:slug' element={<SoftDrinks />} />
        <Route path='/member-login' element={<MemberRegister />} />
      </Routes>
    </div>
  );
};

export default App;
