import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/products/");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProducts(data.products);
      } else {
        alert('Error while fetching data');
      }
    };
    getProducts();
  }, []);

  console.log(products);
 
  return (

    <div className="w-full max-w-screen-xl grid grid-cols-3 gap-6 my-[50px]">
      {

        products.map((product) => (
          <ProductItem product={product} />
        ))
      }
    </div>
  );
}

export default Products