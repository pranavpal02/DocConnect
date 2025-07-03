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
    <div className="bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 rounded-xl shadow-inner px-4 md:px-10 py-10 text-[#262626]">
      <div className="flex flex-col items-center gap-4 mb-10">
        <h2 className="text-3xl font-semibold text-healthcare-primary">
          Related Doctors
        </h2>
        <p className="sm:w-1/2 text-center text-sm text-gray-700">
          Simply browse through our extensive list of trusted doctors
          recommended for you.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            key={index}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow bg-white"
          >
            <img
              className="w-full h-55 object-cover bg-[#EAEFFF]"
              src={item.image}
              alt={item.name}
            />
            <div className="p-5 min-h-40 flex flex-col justify-between">
              <div
                className={`flex items-center gap-2 text-xs ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <span>{item.available ? "Available" : "Not Available"}</span>
              </div>
              <div>
                <p className="text-[#262626] text-base font-semibold mt-2">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-xs">{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
