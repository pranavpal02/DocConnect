import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext"
import { AdminContext } from "../context/AdminContext"

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  return (
    <div className="w-full lg:w-auto lg:min-h-screen bg-white border-b lg:border-b-0 lg:border-r">
      {aToken && (
        <ul className="text-[#515151] flex lg:flex-col lg:mt-5 overflow-x-auto lg:overflow-x-visible">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 lg:px-9 lg:min-w-72 cursor-pointer whitespace-nowrap ${
                isActive ? "bg-[#F2F3FF] border-b-4 lg:border-b-0 lg:border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.home_icon} alt="" />
            <p className="hidden lg:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 lg:px-9 lg:min-w-72 cursor-pointer whitespace-nowrap ${
                isActive ? "bg-[#F2F3FF] border-b-4 lg:border-b-0 lg:border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.appointment_icon} alt="" />
            <p className="hidden lg:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 lg:px-9 lg:min-w-72 cursor-pointer whitespace-nowrap ${
                isActive ? "bg-[#F2F3FF] border-b-4 lg:border-b-0 lg:border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.add_icon} alt="" />
            <p className="hidden lg:block">Add Doctor</p>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 lg:px-9 lg:min-w-72 cursor-pointer whitespace-nowrap ${
                isActive ? "bg-[#F2F3FF] border-b-4 lg:border-b-0 lg:border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.people_icon} alt="" />
            <p className="hidden lg:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
