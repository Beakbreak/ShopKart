import React from "react";
import { Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Skeleton
        variant="rectangular"
        height="200px"
        style={{ marginBottom: "1rem" }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="80%"
        height="24px"
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton variant="text" width="50%" height="20px" />
    </div>
  );
}
