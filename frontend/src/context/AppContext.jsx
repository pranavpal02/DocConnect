// AppContext.jsx
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = "$"
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  console.log("Backend URL:", backendUrl)
  console.log("Full URL will be:", backendUrl + "/api/user/get-profile")

  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  )
  const [userData, setUserData] = useState(null)

  // Getting Doctors using API
  const getDoctosData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list")
      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Fetch user data using token
  const fetchUserData = async (tokenParam) => {
    try {
      console.log("Fetching user data with token:", tokenParam || token)
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token: tokenParam || token },
      })
      console.log("User data response:", data)
      if (data.success) {
        setUserData(data.userData)
        console.log("User data set successfully:", data.userData)
      } else {
        console.log("Failed to fetch user data:", data.message)
        setUserData(null)
      }
    } catch (error) {
      console.log("Error fetching user data:", error.response?.data || error.message)
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
      console.log("Error updating profile:", error)
      toast.error("Failed to update profile")
      return false
    }
  }

  const value = {
    doctors,
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
    getDoctosData()
    if (token) {
      fetchUserData(token)
    } else {
      setUserData(null)
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
