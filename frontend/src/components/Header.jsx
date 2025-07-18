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
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://videos.pexels.com/video-files/3196222/3196222-sd_640_360_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row flex-wrap">
        {/* --------- Header Left --------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 px-6 md:px-10 lg:px-16 m-auto md:py-[8vw]">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans text-white drop-shadow-2xl">
            Book Appointment
            <br />
            <span className="text-healthcare-accent drop-shadow-2xl">
              With Trusted Doctors
            </span>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-medium font-sans drop-shadow-lg">
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
            className="flex items-center gap-2 bg-white text-healthcare-primary px-10 py-4 rounded-full text-lg font-bold font-sans m-auto md:m-0 hover:bg-healthcare-accent hover:text-white transition-all duration-300 drop-shadow-2xl transform hover:scale-105"
          >
            Book Appointment
            <img className="w-4" src={assets.arrow_icon} alt="Arrow icon" />
          </button>
        </div>

        {/* Hero block with fixed square aspect ratio */}
        <div className="md:w-1/2 w-full p-6 flex justify-center items-center">
          <div className="aspect-square max-w-[400px] w-full rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center animate-fade-in relative shadow-2xl border border-white/20">
            <div className="text-center p-6">
              <div
                className="w-24 h-24 bg-gradient-to-br from-healthcare-primary to-healthcare-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onClick={handleHeartClick}
              >
                <Heart
                  className={`w-12 h-12 text-white ${
                    isFlying ? "animate-fly-away" : "animate-rotate-helicopter"
                  }`}
                />
              </div>
              <p className="text-xl font-bold text-healthcare-primary font-sans mb-2 drop-shadow-lg">
                Healthcare Made Simple
              </p>
              <p className="text-gray-700 text-sm font-medium font-sans drop-shadow">
                Professional medical care at your fingertips
              </p>
            </div>
            {/* Floating bubbles */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-healthcare-accent/50 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-healthcare-accent/50 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
