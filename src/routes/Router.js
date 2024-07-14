import React from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import List from "../views/products/List";
import Form from "../views/products/Form";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Router;
