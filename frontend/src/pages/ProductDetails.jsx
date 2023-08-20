import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import { AuthProvider } from "../store/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const FLASK_URL = import.meta.env.VITE_FLASK_BACKEND_URL;

export default function ProductDetails() {
  const location = useLocation();
  const { user } = useContext(AuthProvider);
  const { asin, imageURL, description } = location.state;
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/products/${asin}`);
      const result = await response.json();
      setProductData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [asin]);

  const submitRating = async () => {
    try {
      setSubmittingRating(true);
      const response = await fetch(`${FLASK_URL}/api/updateRating`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asin: asin,
          rating: userRating,
          userID: user.userData._id,
        }),
      });
      const result = await response.json();
      if (result.message) {
        setSubmittingRating(false);
        console.log("Rating submitted successfully");
      }
    } catch (error) {
      setSubmittingRating(false);
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-16 md:mt-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className="flex flex-col p-6 m-3 space-y-10
              md:flex-row md:space-y-0 md:space-x-28 md:m-0 md:p-16"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={imageURL}
                  alt=""
                  className="mx-auto duration-200 w-80 hover:scale-105"
                  loading="lazy"
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
                    <p className="text-5xl font-bold">{productData.price}</p>
                    <div className="flex items-center justify-center md:justify-start">
                      <Rating
                        name="read-only"
                        value={productData.avgRating}
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
              {description ? description : "No description available"}
            </div>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center justify-center md:justify-start">
                <Rating
                  name="user-rating"
                  value={userRating}
                  onChange={(event, newValue) => {
                    setUserRating(newValue);
                  }}
                />
              </div>

              <button
                onClick={submitRating}
                disabled={submittingRating}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {submittingRating ? "Submitting..." : "Submit Rating"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
