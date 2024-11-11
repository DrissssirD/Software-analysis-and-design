
import React from "react";
import NavBar from "@/Components/NavBar";

export default function LandingPage() {
  return (
    <div className="bg-[#25324B] min-h-screen p-4 xl:px-32 md:px-5">
      <NavBar />	

      {/* Main Heading Section */}
      
      <div className="mt-5 sm:mt-10 flex flex-col gap-3 sm:gap-5">	
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug">	
          Discover <br />	
          More than <br />	
        </h1>	
        <h1 className="text-blue-500 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">	
          1000+ jobs	
        </h1>	
      </div>	

      {/* Subtitle Section */}
      
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <h4 className="text-gray-400 font-medium text-lg sm:text-xl lg:text-2xl">
          Great platform for job seekers searching for{" "}
          <br className="hidden sm:block" />
          new career heights and passionate about startups.
        </h4>
      </div>
    </div>
  );
}