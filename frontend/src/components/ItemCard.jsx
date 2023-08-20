import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, IconButton } from "@mui/material";

const ItemCard = ({ item }) => {
  return (
    <div className="max-content mb-8 border py-4">
      <div className="flex items-center gap-4 ml-4">
        <img className="w-32 h-32" src={item.image} alt="productImage" />
        <div className="flex flex-col space-y-2">
          <Typography
            variant="h6"
            className="font-titleFont font-semibold"
            lineHeight="1.2"
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            Price: <span style={{ color: "red" }}>${item.price}</span>
          </Typography>
        </div>
      </div>

      <div className="flex items-center gap-4 text-lg mt-4 ml-4">
        <span
          className="w-6 h-6 bg-gray-100 text-2xl flex items-center 
            justify-center hover:bg-gray-300 cursor-pointer duration-300 
            border-[1px] border-gray-300 hover:border-gray-300"
        >
          -
        </span>
        <p>{item.amount}</p>
        <span
          className="w-6 h-6 bg-gray-100 text-2xl flex items-center 
            justify-center hover:bg-gray-300 cursor-pointer duration-300 
            border-[1px] border-gray-300 hover:border-gray-300"
        >
          +
        </span>
      </div>
      <div className="flex items-center gap-4 text-lg mt-4 ml-4">
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          <span className="font-bold">Total Amount : </span>$
          {item.amount * item.price}
        </Typography>
        <IconButton
          className="bg-gray-100 text-2xl hover:bg-gray-300 
          hover:text-red-500 border-[1px] border-gray-300 
          hover:border-gray-300 duration-300"
          aria-label="Delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ItemCard;
