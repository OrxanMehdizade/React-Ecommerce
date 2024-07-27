import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}

export default App;
