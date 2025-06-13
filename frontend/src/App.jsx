import React, { createContext, useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"

// Create Context for App State
export const AppContext = createContext()

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const backendUrl = "http://localhost:4000"

  // Function to get user data using token
  const getUserData = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setUserData(data.user)
      } else {
        // Token might be invalid, remove it
        localStorage.removeItem("token")
        setToken("")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      localStorage.removeItem("token")
      setToken("")
    } finally {
      setLoading(false)
    }
  }

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      getUserData()
    } else {
      localStorage.removeItem("token")
      setUserData(null)
      setLoading(false)
    }
  }, [token])

  // Context value to be passed to all components
  const value = {
    token,
    setToken,
    userData,
    setUserData,
    backendUrl,
    getUserData,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={value}>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/my-profile"
            element={token ? <MyProfile /> : <Login />}
          />
          <Route
            path="/my-appointments"
            element={token ? <MyAppointments /> : <Login />}
          />
          <Route
            path="/appointment/:docId"
            element={token ? <Appointment /> : <Login />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App