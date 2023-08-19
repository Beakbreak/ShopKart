import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.svg";
import facebookIcon from "../assets/icon-facebook.svg";
import twitterIcon from "../assets/icon-twitter.svg";
import pinterestIcon from "../assets/icon-pinterest.svg";
import instagramIcon from "../assets/icon-instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="container max-w-6xl py-10 mx-auto mt-16 md:mt-0">
        <div className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
          <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
            <Link to="/" className="h-8 text-decoration-none">
              <img
                src={LOGO}
                alt=""
                className="w-44 md:ml-3"
                style={{ filter: "brightness(0.4) invert(1)" }}
              />
            </Link>
            <div className="flex flex-col items-center space-y-2 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
              <div className="h-10 group">
                <a href="#">About</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className="h-10 group">
                <a href="#">Products</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className="h-10 group">
                <a href="#">Support</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
            <div className="flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0">
              <div className="h-8 group">
                <a href="#">
                  <img src={facebookIcon} alt="" className="h-6" />
                </a>
              </div>
              <div className="h-8 group">
                <a href="https://twitter.com/mittalvansh_11">
                  <img src={twitterIcon} alt="" className="h-6" />
                </a>
              </div>
              <div className="h-8 group">
                <a href="#">
                  <img src={pinterestIcon} alt="" className="h-6" />
                </a>
              </div>
              <div className="h-8 group">
                <a href="https://www.instagram.com/mittalvansh11/">
                  <img src={instagramIcon} alt="" className="h-6" />
                </a>
              </div>
            </div>

            <div className="font-bold px-8 text-center md:text-left md:px-0">
              &copy; Shop with Confidence at ShopKart &#169; 2023. All Rights
              Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
