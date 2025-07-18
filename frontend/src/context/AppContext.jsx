// AppContext.jsx
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = "$"
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  )
  const [userData, setUserData] = useState(null)
  const [appointments, setAppointments] = useState([])

  // Getting Doctors using API
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list")
      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch user data using token
  const fetchUserData = async (tokenParam) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token: tokenParam || token },
      })
      if (data.success) {
        setUserData(data.userData)
      } else {
        setUserData(null)
      }
    } catch (error) {
      setUserData(null)
    }
  }

  // Update user profile
  const updateUserProfile = async (formData) => {
    try {
      const { data } = await axios.put(backendUrl + "/api/user/update-profile", formData, {
        headers: { 
          token: token,
          "Content-Type": "multipart/form-data"
        },
      })
      if (data.success) {
        setUserData(data.userData)
        toast.success("Profile updated successfully!")
        return true
      } else {
        toast.error(data.message)
        return false
      }
    } catch (error) {
      toast.error("Failed to update profile")
      return false
    }
  }

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    fetchUserData,
    updateUserProfile,
  }

  useEffect(() => {
    getDoctorsData()
    if (token) {
      fetchUserData(token)
    } else {
      setUserData(null)
      setAppointments([]) // Clear appointments on logout
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
