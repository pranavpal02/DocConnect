import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { assets } from "../assets/assets" // <-- Your custom logo import

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken("")
    setShowDropdown(false)
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-4 sm:px-8">
        {/* ✅ Your Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            HOME
          </Link>
          <Link
            to="/doctors"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            ALL DOCTORS
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            CONTACT
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {userData?.name
                      ? userData.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
                <span className="hidden sm:block">
                  {userData?.name || "User"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">{userData?.name}</p>
                    <p className="text-xs text-gray-500">{userData?.email}</p>
                  </div>
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t py-2">
        <div className="flex flex-wrap justify-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 py-1">
            HOME
          </Link>
          <Link
            to="/doctors"
            className="text-gray-700 hover:text-blue-600 py-1"
          >
            DOCTORS
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 py-1">
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 py-1"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar