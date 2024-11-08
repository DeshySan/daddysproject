import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BannerCard from "./BannerCard";
import Under50 from "./Under50";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Dashboard;
