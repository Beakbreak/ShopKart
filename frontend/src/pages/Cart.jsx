import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../hooks/CartContext";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

export default function Cart() {
  const ctx = useContext(CartContext);
  const products = ctx.items;
  const totalAmount = ctx.totalAmount;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      ctx.setItems(parsedCart.items);
      ctx.setTotalAmount(parsedCart.totalAmount);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-container min-h-screen mx-auto px-4">
        {products.length > 0 ? (
          <div className="pb-20">
            <div className="mt-5">
              {products.map((item) => (
                <div key={item.id}>
                  <ItemCard item={item} />
                </div>
              ))}
            </div>

            <button
              onClick={() => dispatch(resetCart())}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
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
                Your Shopping cart lives to serve. Give it purpose - fill it
                with books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/">
                <button className="bg-black rounded-md cursor-pointer active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
