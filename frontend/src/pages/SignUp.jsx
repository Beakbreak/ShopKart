import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import LOGO from "../assets/logo.svg";
import waveImg from "../assets/wave.png";
import avatarImg from "../assets/avatar.svg";
import unlockImg from "../assets/unlock.svg";

export default function SignUp() {
  return (
    <div>
      <img
        src={waveImg}
        className="fixed hidden lg:block inset-0 h-full z-[-1]"
        alt="Wave Background"
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src={unlockImg}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          alt="Unlock Image"
        />
        <form className="flex flex-col justify-center items-center w-1/2">
          <img src={avatarImg} className="w-32" alt="Avatar" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Welcome to
            <span>
              <img src={LOGO} alt="logo" width={180} className="mx-2 inline" />
            </span>
          </h2>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute text-primarycolor text-xl"
            />
            <input
              type="text"
              placeholder="Username"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
            />
          </div>
          <div className="relative mt-8">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute text-primarycolor text-xl"
            />
            <input
              type="email"
              placeholder="Email"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
            />
          </div>
          <div className="relative mt-8">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute text-primarycolor text-xl"
            />
            <input
              type="password"
              placeholder="Password"
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg"
            />
          </div>
          <a
            href="#"
            className="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-6 transform hover:translate-y-1 transition-all duration-500"
          >
            SignUp
          </a>
          <div className="mt-4 text-lg font-display font-semibold text-gray-700 text-center dark:text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-primarycolor hover:text-primaryhovercolor transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
