import React, { useState } from "react"
import { assets } from "../assets/assets"
import { Heart } from "lucide-react"

const Header = () => {
  const [isFlying, setIsFlying] = useState(false)

  const handleHeartClick = () => {
    setIsFlying(true)
    setTimeout(() => setIsFlying(false), 1000) // Reset after animation duration
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-healthcare-light to-gray-100 border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 px-6 md:px-10 lg:px-16 m-auto md:py-[8vw]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-sans text-healthcare-primary">
          Book Appointment
          <br />
          <span className="text-healthcare-secondary">
            With Trusted Doctors
          </span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 text-sm font-light font-sans">
          <img
            className="w-24"
            src={assets.group_profiles}
            alt="Group profiles"
          />
          <p>
            Booking appointments is now at your fingertips.{" "}
            <br className="hidden sm:block" /> Schedule hassle-free from home.
          </p>
        </div>
        <button
          onClick={() => {
            document
              .getElementById("speciality")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          className="flex items-center gap-2 bg-healthcare-primary px-8 py-3 rounded-full text-white text-sm font-medium font-sans m-auto md:m-0 hover:bg-healthcare-secondary transition-colors duration-300"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow icon" />
        </button>
      </div>

      {/* Hero block with fixed square aspect ratio */}
      <div className="md:w-1/2 w-full p-6 flex justify-center items-center">
        <div className="aspect-square max-w-[400px] w-full rounded-2xl bg-gradient-to-br from-healthcare-primary/30 to-healthcare-secondary/30 flex items-center justify-center animate-fade-in relative shadow-md">
          <div className="text-center p-6">
            <div
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md cursor-pointer"
              onClick={handleHeartClick}
            >
              <Heart
                className={`w-12 h-12 text-healthcare-primary ${
                  isFlying ? "animate-fly-away" : "animate-rotate-helicopter"
                }`}
              />
            </div>
            <p className="text-lg font-semibold text-healthcare-primary font-sans mb-2">
              Healthcare Made Simple
            </p>
            <p className="text-gray-600 text-sm font-sans">
              Professional medical care at your fingertips
            </p>
          </div>
          {/* Floating bubbles */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-healthcare-accent/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-healthcare-accent/30 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  )
}

export default Header
