import React from "react";
import search from "@/Assets/Icon.svg";
import location from "@/Assets/Icon1.svg";

export default function SearchBar() {
  return (
    <div className="bg-white w-full lg:w-[852px] h-[183px] lg:h-[89px] flex flex-col md:flex-row lg:mt-6 p-4 mt-6 md:w-full md:ml-0 items-center">
      <div className="flex w-full flex-1 gap-5 items-center">
        <img src={search} className="h-5 w-5 md:h-6 md:w-6" alt="Search Icon" />
        <input
          placeholder="Job title or keyword"
          className="border-b border-gray-400 w-full md:w-auto text-sm md:text-base focus:border-[#4640DE] focus:outline-none focus:border-b-2"
        />
      </div>
      <div className="flex w-full flex-1 gap-5 items-center mt-1">
        <img
          src={location}
          className="h-5 w-5 md:h-6 md:w-6"
          alt="Location Icon"
        />
        <input
          placeholder="Location"
          className="border-b border-gray-400 w-full md:w-auto text-sm md:text-base focus:border-[#4640DE] focus:outline-none focus:border-b-2"
        />
      </div>
      <button className="bg-[#4640DE] text-white h-10 md:h-[57px] w-full md:w-[209px] font-semibold text-base md:text-xl mt-1">
        Search for a job
      </button>
    </div>
  );
}