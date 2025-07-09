import React, { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem("token")
    setToken(false)
    navigate("/login")
  }

  return (
    <header className="bg-gradient-to-br from-healthcare-light to-gray-100 shadow-lg rounded-b-xl sticky top-0 z-50">
      <div className="w-full max-w-full mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer"
          src={assets.logo}
          alt="DocConnect logo"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-700 font-sans">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary hover:underline transition-colors"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary hover:underline transition-colors"
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary hover:underline transition-colors"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary hover:underline transition-colors"
            }
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {token && userData ? (
            <div className="relative flex items-center gap-3 cursor-pointer group">
              <img
                className="w-10 rounded-full border border-gray-300"
                src={userData.image}
                alt="Profile"
              />
              <img className="w-4" src={assets.dropdown_icon} alt="Dropdown" />
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-30 hidden group-hover:block animate-fade-in">
                <div className="min-w-56 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-healthcare-primary hover:underline cursor-pointer font-sans"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-healthcare-primary hover:underline cursor-pointer font-sans"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-red-600 hover:underline cursor-pointer font-sans"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-healthcare-primary hover:bg-healthcare-secondary text-white px-6 py-2.5 rounded-full hidden md:block transition-colors font-medium font-sans"
            >
              Create Account
            </button>
          )}
          <img
            onClick={() => setShowMenu(true)}
            className="w-8 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          showMenu ? "fixed inset-0 w-full h-full z-40 bg-white" : "h-0 w-0"
        } overflow-hidden transition-all animate-slide-in`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 shadow-sm">
          <img src={assets.logo} className="w-40" alt="DocConnect logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-8 cursor-pointer"
            alt="Close"
          />
        </div>
        <ul className="flex flex-col items-center gap-6 mt-8 text-xl font-semibold font-sans">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="hover:text-healthcare-primary hover:underline transition-colors"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/doctors"
            className="hover:text-healthcare-primary hover:underline transition-colors"
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="hover:text-healthcare-primary hover:underline transition-colors"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="hover:text-healthcare-primary hover:underline transition-colors"
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
