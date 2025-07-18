import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  )
  const [profile, setProfile] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Fetch doctor profile (to be implemented)
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/profile",
        { headers: { dToken } }
      )
      if (data.success) {
        setProfile(data.profile)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    profile,
    getProfile,
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider