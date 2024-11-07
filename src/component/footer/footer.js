import React from "react";
import logo from "../navbar/Ellipse 2.jpg";
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "Company", path: "/company" },
  { name: "Pricing", path: "/pricing" },
  { name: "Terms", path: "/terms" },
  { name: "Advice", path: "/advice" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Help Docs", path: "/Help-Docs" },
  { name: "Guide", path: "/Guide" },
  { name: "Updates", path: "/Updates" },
  { name: "Contact-Us", path: "/Contact-Us" },
];

export function Footer() {
  return (
    <div className="mt-16 sm:flex sm:flex-row  flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="flex gap-4  items-center">
          <img src={logo} className="rounded-full h-8 w-8" />
          <h1 className="text-2xl text-white">Skill Bridge</h1>
        </div>

        <h4 className="sm:w-[376px] w-[250px] text-[#D6DDEB] mt-8 text-base font-normal">
          Great platform for the job seeker that passionate about startups. Find
          your dream job easier.
        </h4>
      </div>

      <div className="flex flex-row mt-6 sm:mt-0 flex-1">
        <div className="flex-1">
          <h2 className="text-lg sm:text-3xl font-semibold mb-4 text-white">
            About
          </h2>

          <div className="flex flex-col text-white gap-4">
            {footerLinks.slice(0, 5).map((link, index) => (
              <Link key={index} to={link.path} className="">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-3xl font-semibold mb-4 text-white">
            Resource
          </h2>

          <div className="flex flex-col text-white gap-4">
            {footerLinks.slice(5).map((link, index) => (
              <Link key={index} to={link.path} className="">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
