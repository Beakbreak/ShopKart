import React from "react";
import Navbar from "../components/Navbar";
import backgroundImg from "../assets/background.jpg";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <img
          src={backgroundImg}
          alt="background"
          className="w-screen h-[30rem] object-cover"
        />
      </div>
    </>
  );
}
