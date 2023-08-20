import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, CircularProgress } from "@mui/material";
import ItemCard from "../components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "../store/CartActions";
import { cartActions } from "../store/CartSlice";

let isMounted = true;
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const products = cart.items;
  const totalAmount = cart.totalAmount;

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
    dispatch(fetchCartData())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const handleResetCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="max-w-container min-h-screen mx-auto px-8">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <CircularProgress />
        </div>
      ) : products.length > 0 ? (
        <div className="pb-20">
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: "2rem",
              fontWeight: "600",
              padding: "2rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Your Cart
          </Typography>
          <Grid container spacing={4} className="px-8 mb-12">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ItemCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: "20px",
              fontWeight: "400",
              margin: "1rem 0 1rem 2rem",
            }}
          >
            <span className="font-bold">Total Amount : </span>${totalAmount}
          </Typography>

          <button
            onClick={handleResetCart}
            className="py-2 px-10 ml-8 bg-black text-white 
              font-semibold uppercase mb-4 hover:bg-gray-900 
              duration-300 rounded-lg"
          >
            Reset cart
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-xl">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/products">
              <button className="bg-black rounded-md cursor-pointer active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
