import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          style={{
            maxWidth: "100%",
            height: "200px",
            objectFit: "contain",
          }}
          image={product.image}
          alt={product.title}
        />
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
