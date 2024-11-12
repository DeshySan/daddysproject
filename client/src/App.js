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
import ProductFocus from "./FrontFace/ProductDisplay/ProductFocus";
import Loading from "./helpers/Loading.js";
import { useCart } from "./FrontFace/useContext/CartContext";

function GlobalLoading() {
  const { loading } = useCart();

  return loading ? <Loading /> : null;
}
const App = () => {
  return (
    <div>
      <GlobalLoading />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/category' element={<Category />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/daddy/:slug' element={<SoftDrinks />} />
        <Route path='/member-login' element={<MemberRegister />} />
        <Route path='/product-page' element={<ProductFocus />} />
        <Route path='/product-page/:id' element={<ProductFocus />} />
      </Routes>
    </div>
  );
};

export default App;
