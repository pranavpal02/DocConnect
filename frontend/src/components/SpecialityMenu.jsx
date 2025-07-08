import React from "react"
import { specialityData } from "../assets/assets"
import { Link } from "react-router-dom"

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-6 py-12 px-6 bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-semibold text-healthcare-primary font-sans">
        Find by Speciality
      </h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600 font-sans">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex flex-wrap justify-center gap-12 pt-5 w-full">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-sm font-medium text-healthcare-secondary font-sans cursor-pointer flex-shrink-0 hover:bg-healthcare-primary/20 transition-colors duration-300 p-4 rounded-lg animate-fade-in"
            key={index}
          >
            <img
              className="w-20 sm:w-28 mb-3"
              src={item.image}
              alt={item.speciality}
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
