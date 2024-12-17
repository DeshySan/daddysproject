import React, { useState } from "react";
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
import Family from "./adminPages/Family.js";
import CreateFamily from "./adminPages/CreateFamily.js";
import HomeFamily from "./FrontFace/Family/HomeFamily.js";
import FacebookLoginButton from "./FrontFace/utils/FacebookLoginButton.js";
import CheckoutForm from "./Checkout/Checkout.js";
import Checkout from "./Checkout/Checkout.js";
import GiftCard from "./FrontFace/ProductDisplay/GiftCard.js";
import WeeklyVouchers from "./FrontFace/ProductDisplay/WeeklyVouchers.js";

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
        <Route path='/family' element={<Family />} />
        <Route path='/admin/create-family' element={<CreateFamily />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/category' element={<Category />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/daddy/:slug' element={<SoftDrinks />} />
        <Route path='/member-login' element={<MemberRegister />} />
        <Route path='/product-page' element={<ProductFocus />} />
        <Route path='/product-page/:id' element={<ProductFocus />} />
        <Route path='homefamily' element={<HomeFamily />} />
        <Route path='test' element={<FacebookLoginButton />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/gift-cards' element={<GiftCard />} />
        <Route path='/weekly-voucher' element={<WeeklyVouchers />} />
      </Routes>
    </div>
  );
};

export default App;
