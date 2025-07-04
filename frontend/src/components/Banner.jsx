import React from "react"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="flex bg-gradient-to-br from-healthcare-primary/20 to-healthcare-secondary/20 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* ------- Left Side ------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-healthcare-primary">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login")
            scrollTo(0, 0)
          }}
          className="bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>

      {/* ------- Right Side ------- */}
      <div className="hidden md:flex items-end justify-end md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-[280px] lg:w-[330px] object-contain mb-[-10px] mr-[-10px]"
          src={assets.appointment_img}
          alt="appointment"
        />
      </div>
    </div>
  )
}

export default Banner