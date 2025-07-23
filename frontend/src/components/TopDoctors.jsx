import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-5 py-12 px-6 bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-lg my-12 w-full">
      <h1 className="text-3xl font-semibold text-healthcare-primary font-sans">
        Top Doctors to Book
      </h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600 font-sans">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="rounded-xl overflow-hidden cursor-pointer hover:bg-healthcare-primary/40 transition-colors duration-300 bg-gradient-to-br from-healthcare-primary/30 to-healthcare-secondary/30 border border-[#C9D8FF] animate-fade-in"
            key={index}
          >
            <img
              className="bg-healthcare-light w-full object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-healthcare-success" : "text-gray-500"
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-healthcare-success" : "bg-gray-500"
                  }`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-semibold font-sans mt-1">
                {item.name}
              </p>
              <p className="text-gray-700 text-sm font-medium font-sans">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors")
          scrollTo(0, 0)
        }}
        className="bg-healthcare-primary text-white px-12 py-3 rounded-full mt-10 font-medium font-sans hover:bg-healthcare-secondary transition-colors duration-300 cursor-pointer"
      >
        View More Doctors
      </button>
    </div>
  )
}

export default TopDoctors
