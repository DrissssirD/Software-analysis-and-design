import React from "react";
import logo from "./Ellipse 2.jpg";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="h-20 bg-[#25324B] flex flex-row justify-between px-4 ">
      <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-12">
        <div>
          <img
            className="sm:w-10 sm:h-10  rounded-full "
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="flex sm:flex-row gap-2 sm:gap-8 text-white items-start sm:items-center">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">
            Skill Bridge
          </h1>
          <Link className="text-sm sm:text-base md:text-lg">Find Jobs</Link>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
        <Link
          to="Login"
          className="w-20 sm:w-24 md:w-[108px] h-10 sm:h-12 flex justify-center items-center text-[#4640DE] text-sm sm:text-base md:text-lg font-medium hover:bg-[#4640DE] hover:text-white transition-colors"
        >
          Login
        </Link>
        <div className=" sm:block w-[1px] h-8 sm:h-10 border-r border-grey"></div>
        <Link to='SignUp' className="bg-[#4640DE] w-20 sm:w-24 md:w-[108px] h-10 sm:h-12 flex justify-center items-center text-sm sm:text-base md:text-lg text-white font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}
