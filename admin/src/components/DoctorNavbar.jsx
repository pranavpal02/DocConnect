import React, { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate, NavLink } from "react-router-dom";

const DoctorNavbar = () => {
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    setDToken("");
    localStorage.removeItem("dToken");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded font-semibold transition-colors duration-200 ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
      <div className="flex gap-2 sm:gap-4">
        <NavLink to="/doctor-dashboard" className={navLinkClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/doctor-appointments" className={navLinkClass}>
          Appointments
        </NavLink>
        <NavLink to="/doctor-profile" className={navLinkClass}>
          Profile
        </NavLink>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default DoctorNavbar; 