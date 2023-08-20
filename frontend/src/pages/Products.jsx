import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Pagination } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "../store/CartActions";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let isMounted = true;
export default function Dashboard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const initialPage = localStorage.getItem("page")
    ? parseInt(localStorage.getItem("page"))
    : 1;
  const [page, setPage] = useState(initialPage);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    localStorage.setItem("page", newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/products?page=${page}`
        );
        const result = await response.json();
        setProductsData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

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
    <div className="p-8">
      <Typography
        sx={{
          fontFamily: "DM Sans",
          fontSize: "2rem",
          fontWeight: "600",
          paddingBottom: "2rem",
          textAlign: "center",
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
      <div className="flex justify-center">
        <Pagination
          count={999}
          size="large"
          shape="rounded"
          page={page} // Set the page value
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
