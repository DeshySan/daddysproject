import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import Category from "./adminPages/Category";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/category' element={<Category />} />
      </Routes>
    </div>
  );
};

export default App;
