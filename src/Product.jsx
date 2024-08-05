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
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.gallery[0]); // Set the first image as default selected
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
    <div className="p-4 max-w-4xl mx-auto mt-[40px] border-2 border-green-500 custom-shadow-green-500 bg-white shadow-lg rounded-lg">
      <div className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="flex-shrink-0 md:w-1/3">
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img
                src={selectedImage}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-4 flex overflow-x-auto space-x-2">
              {Array.isArray(product.gallery) &&
                product.gallery.length > 0 &&
                product.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index}`}
                    className={`cursor-pointer w-20 h-20 object-cover ${
                      selectedImage === image ? "border-2 border-green-500" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
            <h1 className="text-3xl font-extrabold text-green-500">
              {product.title}
            </h1>

            <p className="mt-2 text-lg text-green-800">
              {product.description}
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

            <div className="mt-4 flex items-center space-x-4 mb-4">
              <p className="text-2xl font-bold text-green-600">
                {product.price} {product.currency}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
