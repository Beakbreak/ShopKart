import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import bgimg from "../assets/bgimg.jpg";
import { Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import CartContext from "../hooks/CartContext";

export default function Dashboard() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  let ctx = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setProductsData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      ctx = storedCart;
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-8">
        <img
          src={bgimg}
          alt="background"
          className="w-screen h-[25rem] object-cover px-8 md:h-[30rem]"
        />
      </div>

      <div>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: "2rem",
            fontWeight: "600",
            padding: "2rem",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Products
        </Typography>
        {loading ? (
          <Grid container spacing={4} className="px-8 mb-16">
            {[...Array(12)].map((_, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={4} className="px-8 mb-16">
            {productsData.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}
