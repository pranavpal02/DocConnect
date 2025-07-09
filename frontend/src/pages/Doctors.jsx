import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const { speciality } = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState([])

  // Set the initial searchTerm from URL param
  useEffect(() => {
    if (speciality) {
      setSearchTerm(speciality)
    } else {
      setSearchTerm("")
    }
  }, [speciality])

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = doctors.filter((doc) =>
        doc.speciality.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      setFilteredDoctors(filtered)
    } else {
      setFilteredDoctors(doctors)
    }
  }, [searchTerm, doctors])

  return (
    <div className="px-6 py-12 bg-healthcare-light min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Browse through doctor specialists
      </h1>

      {/* 🔍 Search Input for Speciality */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by speciality (e.g. Gynecologist)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[400px] px-4 py-2 border border-gray-300 rounded-full text-sm font-sans shadow-sm focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
        />
      </div>

      {/* 🧑‍⚕️ Doctors Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }}
              className="rounded-xl overflow-hidden cursor-pointer hover:bg-healthcare-primary/40 transition-colors duration-300 bg-gradient-to-br from-healthcare-primary/30 to-healthcare-secondary/30 border border-[#C9D8FF] animate-fade-in"
            >
              <img
                src={item.image}
                alt={item.name}
                className="bg-healthcare-light w-full object-cover"
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
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No doctors found matching your search.
          </p>
        )}
      </div>
    </div>
  )
}

export default Doctors
