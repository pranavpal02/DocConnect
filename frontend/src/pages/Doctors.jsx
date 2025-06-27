import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div className="px-6 py-12">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Browse through doctor specialists
      </h1>

      {/* Speciality List */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 text-sm text-black font-medium">
        <p
          onClick={() =>
            speciality === "General physician"
              ? navigate("/doctors")
              : navigate("/doctors/General physician")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "General physician" ? "bg-indigo-100 text-black" : ""
          }`}
        >
          General Physician
        </p>
        <p
          onClick={() =>
            speciality === "Gynecologist"
              ? navigate("/doctors")
              : navigate("/doctors/Gynecologist")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
          }`}
        >
          Gynecologist
        </p>
        <p
          onClick={() =>
            speciality === "Dermatologist"
              ? navigate("/doctors")
              : navigate("/doctors/Dermatologist")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
          }`}
        >
          Dermatologist
        </p>
        <p
          onClick={() =>
            speciality === "Pediatricians"
              ? navigate("/doctors")
              : navigate("/doctors/Pediatricians")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
          }`}
        >
          Pediatricians
        </p>
        <p
          onClick={() =>
            speciality === "Neurologist"
              ? navigate("/doctors")
              : navigate("/doctors/Neurologist")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
          }`}
        >
          Neurologist
        </p>
        <p
          onClick={() =>
            speciality === "Gastroenterologist"
              ? navigate("/doctors")
              : navigate("/doctors/Gastroenterologist")
          }
          className={`w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded transition-all cursor-pointer flex items-center justify-center text-center ${
            speciality === "Gastroenterologist"
              ? "bg-indigo-100 text-black"
              : ""
          }`}
        >
          Gastroenterologist
        </p>
      </div>

      {/* Doctors Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden shadow-md bg-white cursor-pointer hover:translate-y-[-5px] transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-50 object-cover bg-blue-50"
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium mt-1">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors