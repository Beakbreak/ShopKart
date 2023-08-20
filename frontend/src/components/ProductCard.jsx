import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const imageURL = product.imageURLHighRes[0];
  const imageURLs = imageURL.match(/'(.*?)'/g);
  const firstImageURL =
    imageURLs && imageURLs.length > 0 ? imageURLs[0].replace(/'/g, "") : "";

  const description = product?.description[0] || "";
  const extractedDescriptionMatch = description.match(/'([^']+)'/);
  const extractedDescription = extractedDescriptionMatch
    ? extractedDescriptionMatch[1]
        .replace(/(<([^>]+)>)/gi, "") // remove HTML tags
        .replace(/\\n/gi, "") // remove new lines
        .replace(/\\/gi, "") // remove backslashes
        .replace(/\s+/g, " ") // remove extra spaces
        .trim() // trim leading and trailing spaces
    : "";

  const handleSpanClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newItem = {
      id: product._id,
      price: product.price.replace("$", ""),
      title: product.title,
      image: firstImageURL,
      quantity: 1,
    };

    dispatch(cartActions.addItemToCart(newItem));
  };

  return (
    <Link
      to={`/product/${product._id}`}
      state={{
        asin: product.asin,
        imageURL: firstImageURL,
        description: extractedDescription,
      }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardActionArea style={{ flex: 1 }}>
          <CardMedia
            component="img"
            style={{
              maxWidth: "100%",
              height: "200px",
              objectFit: "contain",
              paddingTop: "1rem",
            }}
            image={firstImageURL}
            alt={product.title}
            loading="lazy"
          />
          {hovered && (
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="p-0 w-12 h-12 cursor-pointer min-w-auto min-h-auto 
                text-3xl rounded-md bg-black text-white hover:bg-black flex 
                items-center justify-center"
                onClick={handleSpanClick}
              >
                +
              </span>
            </div>
          )}
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
            <Rating
              name="read-only"
              value={product.avgRating}
              readOnly
              sx={{
                marginBottom: "0.5rem",
              }}
            />
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Price: <span style={{ color: "red" }}>{product.price}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
