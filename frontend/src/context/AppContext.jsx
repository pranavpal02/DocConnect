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

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
  }

  useEffect(() => {
    getDoctosData()
  }, [])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider
