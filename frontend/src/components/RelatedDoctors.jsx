import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className="relative bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-lg my-12 w-full max-w-full px-6 sm:px-8 lg:px-10 py-12 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-10 rounded-xl pointer-events-none"></div>

      <div className="flex flex-col items-center gap-4 mb-10 z-10">
        <h2 className="text-3xl font-semibold text-gray-900 font-sans">
          Top Doctors in {speciality}
        </h2>
        <p className="text-sm text-gray-700 font-sans max-w-2xl text-center">
          Explore our curated list of top doctors in {speciality} to find the
          perfect match for your healthcare needs.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 z-10">
        {relDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo(0, 0)
            }}
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 shadow-md rounded-xl overflow-hidden cursor-pointer hover:bg-healthcare-primary/20 hover:shadow-lg transition-colors duration-300 animate-fade-in"
            role="button"
            aria-label={`View appointment for ${item.name}`}
          >
            <img
              className="w-full h-65 object-cover bg-healthcare-primary/10"
              src={item.image}
              alt={item.name}
            />
            <div className="p-6 min-h-48 flex flex-col justify-between">
              <div
                className={`flex items-center gap-2 text-xs font-medium font-sans ${
                  item.available ? "text-green-600" : "text-gray-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-600" : "bg-gray-600"
                  }`}
                ></span>
                <span>{item.available ? "Available" : "Not Available"}</span>
              </div>
              <div>
                <p className="text-gray-900 text-base font-semibold mt-2 font-sans">
                  {item.name}
                </p>
                <p className="text-gray-700 text-xs font-medium font-sans">
                  {item.speciality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
