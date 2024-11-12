import React from "react";
import BannerCard from "../BannerCard";
import Dashboard from "../Dashboard";
import Under50 from "../Under50";
import Banner from "./Banner";
import { useCart } from "../useContext/CartContext";

const HomePage = () => {
  return (
    <div>
      <Dashboard>
        <Banner />
        <BannerCard />
        <Under50 />
      </Dashboard>
    </div>
  );
};

export default HomePage;
