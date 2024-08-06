import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./Context";
import ColorTag from "./components/ColorTag";

const Product = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();
  const { refreshTokens } = useContext(Context);
  const [refreshed, setRefreshed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const getProductDetails = async () => {
    const accessToken = document.cookie.split("=")[1];
    try {
      const response = await fetch(
        `http://localhost:5000/products/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setSelectedImage(data?.gallery[0]);
        setProduct(data);
      } else if (response.status === 401) {
        const status = refreshTokens();
        setRefreshed(status);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getColorsForSize = (size) => {
    const selectedOption = product.itemOptions.find(
      (option) => option.size === size
    );
    return selectedOption ? selectedOption.color : [];
  };

  return (
    <div className="w-full flex justify-between p-16">
      <div className="flex gap-4">
        <div>
          {Array.isArray(product.gallery) &&
            product.gallery.length > 0 &&
            product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index}`}
                className={`cursor-pointer size-[100px] object-contain border-[1px] border-zinc-400" ${
                  selectedImage === image ? "border-2 border-green-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
        </div>
        <img
          className="w-[550px] h-[450px] object-contain border-[1px] border-zinc-400"
          src={selectedImage}
          alt="This image was not found."
        />
      </div>

      <div className="w-1/3 flex flex-col justify-between">
        <h2 className="text-4xl mt-5 font-bold">{product.title}</h2>
        <div className="mb-24">
          <p className="text-lg font-light mb-3 mt-8">{product.description}</p>
          <p className="text-xl mt-3">
            {product.price} {product.currency}
          </p>
          <div className="mt-4 flex items-center space-x-6">
            <div>
              <p className="text-sm font-medium text-green-700">Category:</p>
              <p className="text-md font-semibold text-green-500">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-green-700">Stock:</p>
              <p
                className={`text-md font-semibold ${
                  product.stock > 0 ? "text-green-500" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 p-2 border border-green-500 rounded-lg shadow-sm custom-shadow-green-500">
              <p className="text-sm text-green-600 font-semibold">Size:</p>
              <div className="flex flex-wrap">
                {product.itemOptions &&
                  product.itemOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`mr-2 mb-2 px-4 py-2 border rounded-lg ${
                        selectedSize === option.size
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      onClick={() => setSelectedSize(option.size)}
                    >
                      {option.size}
                    </button>
                  ))}
              </div>
            </div>

            <div className="mb-2 p-2 border border-green-500 rounded-lg shadow-sm custom-shadow-green-500">
              <p className="text-sm text-green-600 font-semibold">Color:</p>
              <div className="flex flex-wrap">
                {selectedSize &&
                  getColorsForSize(selectedSize).map((color, idx) => (
                    <ColorTag key={idx} color={color} />
                  ))}
              </div>
            </div>
          </div>
          <button className="bg-emerald-400 px-6 py-3 text-white">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
