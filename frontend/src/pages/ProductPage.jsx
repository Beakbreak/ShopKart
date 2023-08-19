import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import Navbar from "../components/Navbar";

export default function ProductPage() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const result = await response.json();
        setProductData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center h-screen md:h-[80vh]">
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div
              className="flex flex-col p-6 m-3 space-y-10 
              md:flex-row md:space-y-0 md:space-x-28 md:m-0 md:p-16"
            >
              <div>
                <img
                  src={productData.image}
                  alt=""
                  className="mx-auto duration-200 w-60 hover:scale-105"
                />
              </div>

              <div className="flex flex-col space-y-6">
                <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                  <div>
                    <div
                      className="inline-block px-3 py-1 text-sm  
                            text-white bg-black rounded-full"
                    >
                      Free Shipping
                    </div>
                  </div>

                  <div className="max-w-sm text-2xl font-medium">
                    {productData.title}
                  </div>

                  <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                    <p className="text-5xl font-bold">${productData.price}</p>
                    <div className="flex items-center justify-center md:justify-start">
                      <Rating
                        name="read-only"
                        value={productData.rating.rate}
                        readOnly
                      />
                    </div>
                    <p className="text-sm font-light text-gray-400">
                      This offer is valid until April 3rd or as long as stock
                      lasts!
                    </p>
                  </div>

                  <div className="group">
                    <button
                      className="w-full bg-black duration-150 text-white mt-4 border-b-8 
                            border-b-black rounded-lg group-hover:border-t-8
                            group-hover:border-b-0 group-hover:bg-black
                            group-hover:border-t-black group-hover:shadow-lg"
                    >
                      <div
                        className="px-8 py-4 duration-150 bg-black rounded-lg text-2xl 
                                group-hover:bg-black"
                      >
                        Add to cart
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-md text-gray-600 text-center px-4">
              <span className="text-black font-bold">Description : </span>
              {productData.description.charAt(0).toUpperCase() +
                productData.description.slice(1)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
