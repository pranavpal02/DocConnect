import React from "react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex bg-gradient-to-br from-healthcare-light to-gray-100 border border-gray-200 rounded-xl shadow-lg px-6 sm:px-8 lg:px-10 py-12 my-12 w-full max-w-full animate-fade-in gap-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-10 rounded-xl"></div>

      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center z-10">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-healthcare-primary font-sans">
          <p>Book Your Appointment Now</p>
          <p className="mt-2 text-lg sm:text-xl lg:text-2xl text-healthcare-secondary font-medium">
            With 100+ Trusted Doctors
          </p>
        </div>
        <p className="mt-3 text-sm sm:text-base text-gray-600 font-sans max-w-lg">
          Schedule your visit in minutes with our trusted healthcare
          professionals.
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-600 font-sans max-w-lg">
          Choose from a wide range of specialties tailored to your needs.
        </p>
        <button
          onClick={() => {
            navigate("/login")
            window.scrollTo(0, 0)
          }}
          className="inline-flex items-center justify-center bg-healthcare-primary text-sm sm:text-base text-white px-4 py-2 rounded-full mt-6 font-medium font-sans hover:bg-healthcare-secondary hover:shadow-md transition-colors duration-300 cursor-pointer w-fit"
        >
          Create Account Now
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-end justify-end md:w-1/2 z-10">
        <img
          className="w-full max-w-[320px] lg:max-w-[360px] object-contain"
          src={assets.appointment_img}
          alt="Appointment illustration"
        />
      </div>
    </div>
  )
}

export default Banner
