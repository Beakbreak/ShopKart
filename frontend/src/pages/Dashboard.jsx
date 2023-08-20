import React, { useEffect, useState, useContext } from "react";
import bgimg from "../assets/bgimg.jpg";
import { Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "../store/CartActions";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
let isMounted = true;

export default function Dashboard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/products`);
        const result = await response.json();
        setProductsData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isMounted) {
      isMounted = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
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
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}
