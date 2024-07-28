import React, { useState } from 'react';

const ProductItem = ({ product }) => {
  // State to manage the selected size and color
  const [selectedSize, setSelectedSize] = useState(product.itemOptions[0]?.size || '');
  const [selectedColor, setSelectedColor] = useState(product.itemOptions[0]?.color || '');

  // Get available options for sizes and colors
  const sizeOptions = Array.from(new Set(product.itemOptions.map(option => option.size)));
  const colorOptions = Array.from(new Set(product.itemOptions.filter(option => option.size === selectedSize).map(option => option.color)));

  // Get the quantity for the selected size and color
  const getQuantity = () => {
    const option = product.itemOptions.find(option => 
      option.size === selectedSize && option.color === selectedColor
    );
    return option ? option.quantity : 0;
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src={product.gallery[0]}
          alt={product.title}
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </a>
        <p className="text-gray-700 dark:text-gray-400 mt-2">
          {product.description}
        </p>
        <div className="flex flex-col mt-3">
          {/* Size Selector */}
          <div className="mb-2">
            <label htmlFor="size" className="block text-gray-700 dark:text-gray-300">Size</label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => {
                const newSize = e.target.value;
                setSelectedSize(newSize);
                // Reset color selection if size changes
                setSelectedColor('');
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {sizeOptions.map(size => (
                <option key={size} value={size}>
                  {size} ({product.itemOptions.filter(option => option.size === size).reduce((sum, option) => sum + option.quantity, 0)})
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          {selectedSize && (
            <div className="mb-2">
              <label htmlFor="color" className="block text-gray-700 dark:text-gray-300">Color</label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {colorOptions.map(color => (
                  <option key={color} value={color}>
                    {color} ({product.itemOptions.filter(option => option.size === selectedSize && option.color === color).reduce((sum, option) => sum + option.quantity, 0)})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Display */}
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            Available Quantity: {getQuantity()}
          </p>
        </div>

        <div className="flex items-center justify-between mt-[15px]">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.currency}{product.price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
