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
import Vouchers from "./adminPages/Vouchers.js";
import Payment from "./Payment.js";
import PaymentComponent from "./Checkout/PaymentComponent.js";
import ColorPicker from "./FrontFace/utils/ColorPicker.js";
import GetSuburbLocation from "./FrontFace/GetSuburbLocation.js";
import Member from "./adminPages/Member.js";
import DragDrop from "./adminPages/DragDrop.js";
import ScrollAnimationComponent from "./adminPages/ScrollAnimationComponent.js";
import "./App.css";
import Header2 from "./FrontFace/Layouts/Header2.js";

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
        <Route path='/admin/vouchers' element={<Vouchers />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/category' element={<Category />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/daddy/:slug' element={<SoftDrinks />} />
        <Route path='/member-login' element={<MemberRegister />} />
        <Route path='/product-page' element={<ProductFocus />} />
        <Route path='/product-page/:id' element={<ProductFocus />} />
        <Route path='homefamily' element={<HomeFamily />} />
        {/* <Route path='test' element={<FacebookLoginButton />} /> */}
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/test' element={<Header2 />} />
        <Route path='/gift-cards' element={<GiftCard />} />
        <Route path='/colors' element={<ColorPicker />} />
        <Route path='/weekly-vouchers' element={<WeeklyVouchers />} />
        <Route path='/payment' element={<PaymentComponent />} />
        <Route path='/admin/members' element={<Member />} />
        {/* <Route path='/test' element={<ScrollAnimationComponent />} /> */}
      </Routes>
    </div>
  );
};

export default App;
