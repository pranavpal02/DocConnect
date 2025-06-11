import React from "react"
import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-6">
      {/* Logo */}
      <img className="w-[14rem] cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Navigation links */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Buttons */}
      <div>
        <button className="bg-white text-grey font-semibold px-4 py-1 rounded-full hover:bg-gray-100">
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Navbar
