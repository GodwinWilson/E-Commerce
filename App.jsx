import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Reset from "./pages/Reset";
import { ToastContainer } from "react-toastify";
import ItemDetails from "./pages/ItemDetails";
import Admin from "./pages/Admin";


function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="orders" element={<Order />} />
        <Route path="cart" element={<Cart />} />
        <Route path="forgot-password" element={<Reset />} />
        <Route path='/products/:itemId' element={<ItemDetails/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
