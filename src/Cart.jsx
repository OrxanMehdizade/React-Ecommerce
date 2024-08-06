import { useEffect, useContext } from "react";
import { Context } from "./Context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate=useNavigate();
  const { isLoggedIn } = useContext(Context);
  const[cookies, setCookies]=useCookies(["accessToken"]);

  const getCartItems = async () => {
    const response = await fetch("http://localhost:5000/baskets",{
        headers:{
            Authorization:`Bearer ${cookies.accessToken}`,
        },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    getCartItems();
  }, [isLoggedIn]);

  return <div>Cart</div>;
};

export default Cart;
