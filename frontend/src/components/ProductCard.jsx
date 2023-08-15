import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const handleSpanClick = (event) => {
    // Stop the event from propagating to the parent CardActionArea
    event.stopPropagation();

    // Add your span click logic here if needed
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
          image={product.image}
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
