import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors"
import axios from "axios"
import { toast } from "react-toastify"

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext)
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")
  const [bookedSlots, setBookedSlots] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const refreshBookedSlots = async () => {
    setIsRefreshing(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/booked-slots/${docId}`)
      if (data.success) {
        setBookedSlots(data.bookedSlots || {})
        toast.success("Slots refreshed successfully")
      }
    } catch (error) {
      toast.error("Failed to refresh slots")
    } finally {
      setIsRefreshing(false)
    }
  }

  const isSlotBooked = (slotDate, slotTime) => {
    
    if (!bookedSlots[slotDate]) {
      return false
    }
    
    
    const isBooked = bookedSlots[slotDate].some(
      (t) => {
        const match = t.toLowerCase() === slotTime.toLowerCase()
        return match
      }
    )
    
    return isBooked
  }

  const getAvailableSolts = async () => {
    setDocSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      currentDate.setHours(10, 0, 0, 0)
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })

        // Create date key for checking booked slots
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          slotDate: slotDate
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment")
      return navigate("/login")
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate("/my-appointments")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSlotClick = (item) => {
    
    if (isSlotBooked(item.slotDate, item.time)) {
      toast.warning("This slot is already booked")
      return
    }
    
    
    setSlotTime(item.time)
  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts()
    }
  }, [docInfo])

  return docInfo ? (
    <div className="relative bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-lg my-12 w-full max-w-full px-6 py-12 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-10 rounded-xl pointer-events-none"></div>

      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6 z-20 animate-fade-in">
        <div>
          <img
            className="bg-healthcare-primary/10 w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-xl p-6 sm:p-8">
          <p className="flex items-center gap-2 text-3xl font-semibold text-gray-900 font-sans">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-700 font-sans">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-3 border border-gray-300 text-xs rounded-full font-medium font-sans">
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 font-sans">
              About <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-700 max-w-[700px] mt-1 font-sans">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-700 font-medium mt-4 font-sans">
            Appointment fee:{" "}
            <span className="text-gray-900">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8 font-medium text-gray-900 font-sans bg-gradient-to-br from-white to-gray-50 shadow-md rounded-xl p-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <p className="text-lg">Booking Slots</p>
          <button
            onClick={refreshBookedSlots}
            disabled={isRefreshing}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              isRefreshing 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {isRefreshing ? "Refreshing..." : "Refresh Slots"}
          </button>
        </div>
        <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-20 rounded-full cursor-pointer hover:bg-healthcare-primary/20 transition-colors ${
                  slotIndex === index
                    ? "bg-healthcare-primary text-white"
                    : "border border-gray-300"
                }`}
              >
                <p className="font-medium">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-4 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => {
              const isBooked = isSlotBooked(item.slotDate, item.time)
              return (
                <p
                  onClick={() => {
                    handleSlotClick(item)
                  }}
                  onMouseDown={() => {}}
                  onMouseUp={() => {}}
                  key={index}
                  className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full transition-colors cursor-pointer ${
                    isBooked
                      ? "bg-red-100 text-red-600 border border-red-300 opacity-75"
                      : item.time === slotTime
                      ? "bg-healthcare-primary text-white hover:bg-healthcare-secondary"
                      : "text-gray-700 border border-gray-300 hover:bg-healthcare-primary/20"
                  }`}
                >
                  {item.time.toLowerCase()}
                  {isBooked && " (Booked)"}
                </p>
              )
            })}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-healthcare-primary text-white text-sm font-medium px-8 py-2.5 rounded-full mt-6 hover:bg-healthcare-secondary hover:shadow-md transition-colors cursor-pointer"
        >
          Book an Appointment
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null
}

export default Appointment