import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(
    product.itemOptions[0]?.size || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.itemOptions[0]?.color || ""
  );

  const sizeOptions = Array.from(
    new Set(product.itemOptions.map((option) => option.size))
  );
  const colorOptions = Array.from(
    new Set(
      product.itemOptions
        .filter((option) => option.size === selectedSize)
        .map((option) => option.color)
    )
  );

  const getQuantity = () => {
    const option = product.itemOptions.find(
      (option) => option.size === selectedSize && option.color === selectedColor
    );
    return option ? option.quantity : 0;
  };

  return (
    <div
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        className="p-8 rounded-t-lg"
        src={product.gallery[0]}
        alt={product.title}
      />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>

        <div className="flex items-center justify-between mt-[15px]">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.price} {product.currency}
          </span>
          <button className="text-white bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
