import React, { useContext, useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors"
import axios from "axios"
import { toast } from "react-toastify"

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext)
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const navigate = useNavigate()

  const dateScrollRef = useRef()
  const timeScrollRef = useRef()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSolts = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
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

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
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
        getDoctosData()
        navigate("/my-appointments")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -120, behavior: "smooth" })
    }
  }
  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 120, behavior: "smooth" })
    }
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
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-healthcare-light rounded-xl shadow-lg animate-fade-in">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-8">
        <div>
          <img
            className="rounded-xl shadow-md max-w-xs sm:max-w-sm mx-auto sm:mx-0 border-4 border-healthcare-primary"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border border-healthcare-primary rounded-xl p-8 bg-white shadow-md">
          <p className="flex items-center gap-2 text-3xl font-semibold text-healthcare-primary">
            {docInfo.name}
            <img className="w-6" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-3 mt-1 text-healthcare-secondary font-medium">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-3 border border-healthcare-primary text-sm rounded-full text-healthcare-primary">
              {docInfo.experience}
            </button>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-lg font-semibold text-healthcare-primary">
              About
              <img className="w-4" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-gray-700 mt-2 max-w-xl leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          <p className="mt-6 text-gray-800 font-semibold text-lg">
            Appointment fee:{" "}
            <span className="text-healthcare-primary text-xl font-bold">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="mt-12">
        <p className="text-healthcare-primary font-semibold text-xl mb-4">
          Booking slots
        </p>

        {/* Date slots */}
        <div className="mb-6">
          <div
            ref={dateScrollRef}
            className="flex gap-4 items-center overflow-x-auto scrollbar-hide px-12"
          >
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`cursor-pointer rounded-full min-w-[56px] sm:min-w-[64px] py-4 sm:py-6 px-4 sm:px-6 text-center select-none transition-colors duration-300 ${
                    slotIndex === index
                      ? "bg-healthcare-primary text-white shadow-lg"
                      : "border border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary/20"
                  }`}
                >
                  <p className="font-semibold text-xs sm:text-lg">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-base sm:text-xl font-bold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Time slots with scroll buttons */}
        <div className="relative">
          <button
            onClick={() => scrollLeft(timeScrollRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-healthcare-primary text-white rounded-full p-2 shadow-lg z-10 hover:bg-healthcare-accent transition"
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <div
            ref={timeScrollRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-12"
          >
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium flex-shrink-0 px-6 py-2 rounded-full cursor-pointer select-none transition-colors duration-300 ${
                    item.time === slotTime
                      ? "bg-healthcare-primary text-white shadow-md"
                      : "text-healthcare-secondary border border-healthcare-primary hover:bg-healthcare-primary/20"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={() => scrollRight(timeScrollRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-healthcare-primary text-white rounded-full p-2 shadow-lg z-10 hover:bg-healthcare-accent transition"
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>

        <button
          onClick={bookAppointment}
          className="mt-10 bg-healthcare-primary hover:bg-healthcare-accent transition text-white font-semibold text-lg px-28 py-4 rounded-full shadow-lg"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-16 px-4 md:px-10 py-10 bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 rounded-xl shadow-inner">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  ) : null
}

export default Appointment
