import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Product from "./Product";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState, useContext } from "react";
import { Context } from "./Context";
import { CookiesProvider } from "react-cookie";
import Cart from "./Cart";

function App() {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
