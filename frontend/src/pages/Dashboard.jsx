import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImg from "../assets/background.jpg";
import { CircularProgress, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Dashboard() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <img
          src={backgroundImg}
          alt="background"
          className="w-screen h-[30rem] object-cover"
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
          <Grid container spacing={4} className="px-8 mb-8">
            {[...Array(12)].map((_, index) => (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={4} className="px-8 mb-8">
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
