import React from "react"
import { assets } from "../assets/assets"
import { FaInstagram, FaFacebookF } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          <img className="mb-5 w-55" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Welcome to DocConnect, Canada’s trusted platform that brings
            healthcare closer to you. We understand how important timely medical
            care is, which is why we empower patients to book doctor
            appointments in real time — no more waiting weeks or calling
            multiple clinics.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-healthcare-primary font-semibold" : "hover:text-healthcare-primary"}>Home</NavLink></li>
            <li><NavLink to="/doctors" className={({ isActive }) => isActive ? "text-healthcare-primary font-semibold" : "hover:text-healthcare-primary"}>All Doctors</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-healthcare-primary font-semibold" : "hover:text-healthcare-primary"}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-healthcare-primary font-semibold" : "hover:text-healthcare-primary"}>Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-234-456-7890</li>
            <li>kingcodesdev@gmail.com</li>
            <li className="flex items-center gap-2">
              <FaInstagram />
              @docconnectCA
            </li>
            <li className="flex items-center gap-2">
              <FaFacebookF />
              DocConnectCA
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ DocConnect.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
