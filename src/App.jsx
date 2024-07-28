import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import  secureLocalStorage  from  "react-secure-storage";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  useEffect(()=>{
    const status= secureLocalStorage.getItem("accessToken");
    setIsLoggedIn(status);
  },[]);
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}

export default App;
