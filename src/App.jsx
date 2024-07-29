import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState,useContext } from "react";
import { Context } from './Context';

function App() {
  const {accessToken,setAccessToken}=useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <Routes>
      {accessToken ? (
        <>
          <Route path="/home" element={<Homepage />} />
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
