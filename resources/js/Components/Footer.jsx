import React from "react";
import { Link } from '@inertiajs/react';
import logo from "@/Assets/Ellipse 2.jpg";


const footerLinks = [
  { name: "Company", route: 'company' },
  { name: "Pricing", route: 'pricing' },
  { name: "Terms", route: 'terms' },
  { name: "Advice", route: 'advice' },
  { name: "Privacy Policy", route: 'privacy' },
  { name: "Help Docs", route: 'help' },
  { name: "Guide", route: 'guide' },
  { name: "Updates", route: 'updates' },
  { name: "Contact Us", route: 'contact' },
];

export default function Footer() {
  return (
    <div className="mt-16 sm:flex sm:flex-row flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="flex gap-4 items-center">
          <img src={logo} className="rounded-full h-8 w-8" alt="Logo" />
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
              <Link key={index} href={route(link.route)} className="">
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
              <Link key={index} href={route(link.route)} className="">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}