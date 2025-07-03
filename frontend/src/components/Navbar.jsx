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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-36 cursor-pointer"
          src={assets.logo}
          alt="DocConnect logo"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary transition-colors"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary transition-colors"
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary transition-colors"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-healthcare-primary border-b-2 border-healthcare-primary pb-1"
                : "hover:text-healthcare-primary transition-colors"
            }
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative flex items-center gap-2 cursor-pointer group">
              <img
                className="w-8 rounded-full border border-gray-300"
                src={userData.image}
                alt="Profile"
              />
              <img className="w-3" src={assets.dropdown_icon} alt="dropdown" />
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-30 hidden group-hover:block">
                <div className="min-w-48 bg-white rounded shadow p-4 flex flex-col gap-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-healthcare-primary cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-healthcare-primary cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-healthcare-primary hover:bg-healthcare-primary/90 text-white px-5 py-2 rounded-full hidden md:block transition"
            >
              Create Account
            </button>
          )}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          showMenu ? "fixed inset-0 w-full h-full z-40 bg-white" : "h-0 w-0"
        } overflow-hidden transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200 shadow-sm">
          <img src={assets.logo} className="w-32" alt="DocConnect logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-7 cursor-pointer"
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-8 text-lg font-medium">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="hover:text-healthcare-primary transition"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/doctors"
            className="hover:text-healthcare-primary transition"
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about"
            className="hover:text-healthcare-primary transition"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/contact"
            className="hover:text-healthcare-primary transition"
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
