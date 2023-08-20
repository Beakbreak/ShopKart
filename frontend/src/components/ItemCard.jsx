import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartSlice";

const productCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(cartActions.removeItemFromCart(product.id));
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(cartActions.addItemToCart(product));
  };

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
      }}
    >
      <CardActionArea style={{ flex: 1 }}>
        <CardMedia
          component="img"
          style={{
            maxWidth: "100%",
            height: "180px",
            objectFit: "contain",
            paddingTop: "1rem",
          }}
          image={product.image}
          alt={product.title}
          loading="lazy"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "DM Sans",
              fontSize: "18px",
              fontWeight: "600",
              padding: "0.5rem 0",
              lineHeight: "1.2",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            Price: <span style={{ color: "red" }}>${product.price}</span>
          </Typography>
          <div className="flex items-center gap-4 text-lg mt-4">
            <span
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center 
            justify-center hover:bg-gray-300 cursor-pointer duration-300 
            border-[1px] border-gray-300 hover:border-gray-300"
              onClick={handleRemoveItem}
            >
              -
            </span>
            <p>{product.quantity}</p>
            <span
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center 
            justify-center hover:bg-gray-300 cursor-pointer duration-300 
            border-[1px] border-gray-300 hover:border-gray-300"
              onClick={handleAddItem}
            >
              +
            </span>
          </div>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "1rem",
            }}
          >
            <span className="font-bold">Amount : </span>${product.totalPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default productCard;
