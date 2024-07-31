import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Product from "./Product";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState,useContext } from "react";
import { Context } from './Context';


function App() {
  const {isLoggedIn}=useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Homepage />} />
          <Route path="/product/:id" element={<Product />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}

export default App;
