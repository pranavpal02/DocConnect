import React from "react"
import { assets } from "../assets/assets"
import { Heart } from "lucide-react"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-white border border-black rounded-lg px-0 md:px-0 lg:px-0 overflow-hidden">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 px-6 md:px-10 lg:px-20 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight">
          <span className="text-black">Book Appointment</span>
          <br />
          <span className="text-[#12543C]">With Trusted Doctors</span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-gray-700 text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Booking appointment is now on your fingertips,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free from your home.
          </p>
        </div>
        <button
          onClick={() => {
            document
              .getElementById("speciality")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          className="flex items-center gap-2 bg-[#12543C] px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="arrow icon" />
        </button>
      </div>

      {/* Hero block with fixed square aspect ratio */}
      <div className="md:w-1/2 w-full p-4 flex justify-center items-center">
        <div className="aspect-square max-w-[400px] w-full rounded-2xl bg-gradient-to-br from-healthcare-primary/20 to-healthcare-secondary/20 flex items-center justify-center animate-scale-in relative">
          <div className="text-center p-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-12 h-12 text-healthcare-primary" />
            </div>
            <p className="text-lg font-semibold text-healthcare-primary mb-2">
              Healthcare Made Simple
            </p>
            <p className="text-gray-600">
              Professional medical care at your fingertips
            </p>
          </div>
          {/* floating bubbles */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-healthcare-secondary/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-healthcare-primary/20 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  )
}

export default Header
