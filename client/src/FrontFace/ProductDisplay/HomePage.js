import React from "react";
import BannerCard from "../BannerCard";
import Dashboard from "../Dashboard";
import Under50 from "../Under50";
import Banner from "./Banner";
import SecondBanner from "./SecondBanner";
import { useCart } from "../useContext/CartContext";
import HomeFamily from "../Family/HomeFamily";

const HomePage = () => {
  return (
    <div className='overflow-x-hidden'>
      <Dashboard>
        <Banner />
        <BannerCard />
        <HomeFamily />
        <Under50 />
      </Dashboard>
    </div>
  );
};

export default HomePage;
