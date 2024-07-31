import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from './Context';

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const{refreshTokens}=useContext(Context);
  const [refreshed,setRefreshed] =useState(false);


  const getProductDetails = async () => {
    const accessToken = document.cookie.split("=")[1];
    const response = await fetch(
      `http://localhost:5000/products/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProduct(data);
    }else if(response.status === 401){
      const status=refreshTokens();
      setRefreshed(status);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Product;
