import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from "../assets/assets"
import uploadArea from "../assets/upload_area.png"
import { useRef, useCallback } from "react"

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState("")
  const [processingPayment, setProcessingPayment] = useState(false)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    )
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const simulatePayment = async (appointmentId) => {
    try {
      setProcessingPayment(true)
      const { data } = await axios.post(
        backendUrl + "/api/user/simulate-payment",
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success("Payment completed successfully!")
        getUserAppointments()
        setPayment("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setProcessingPayment(false)
    }
  }

  const paypalRef = useRef(null)

  const handlePayPalPayment = useCallback((appointment) => {
    if (!window.paypal || !paypalRef.current) return
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: appointment.amount.toString(),
              },
              description: `Appointment with Dr. ${appointment.docData.name}`,
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        })
      },
      onApprove: async (data, actions) => {
        await actions.order.capture()
        // Mark payment as completed in backend
        setProcessingPayment(true)
        try {
          const { data: resp } = await axios.post(
            backendUrl + "/api/user/mark-payment",
            { appointmentId: appointment._id },
            { headers: { token } }
          )
          if (resp.success) {
            toast.success("Payment completed successfully!")
            getUserAppointments()
            setPayment("")
          } else {
            toast.error(resp.message)
          }
        } catch (error) {
          toast.error(error.message)
        } finally {
          setProcessingPayment(false)
        }
      },
      onError: (err) => {
        toast.error("PayPal payment failed. Please try again.")
        setProcessingPayment(false)
      },
    }).render(paypalRef.current)
  }, [backendUrl, token, getUserAppointments])

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  useEffect(() => {
    if (payment) {
      const appointment = appointments.find(a => a._id === payment)
      if (appointment && !appointment.payment && !appointment.cancelled && !appointment.isCompleted) {
        handlePayPalPayment(appointment)
      }
    }
    // eslint-disable-next-line
  }, [payment])

  const getStatusColor = (appointment) => {
    if (appointment.cancelled) return "bg-red-100 text-red-600 border-red-200"
    if (appointment.isCompleted) return "bg-green-100 text-green-600 border-green-200"
    if (appointment.payment) return "bg-blue-100 text-blue-600 border-blue-200"
    return "bg-yellow-100 text-yellow-600 border-yellow-200"
  }

  const getStatusText = (appointment) => {
    if (appointment.cancelled) return "Cancelled"
    if (appointment.isCompleted) return "Completed"
    if (appointment.payment) return "Paid"
    return "Pending"
  }

  const getStatusIcon = (appointment) => {
    if (appointment.cancelled) return "❌"
    if (appointment.isCompleted) return "✅"
    if (appointment.payment) return "💳"
    return "⏳"
  }

  return (
    <div className="w-full bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-sm p-6 sm:p-10 mt-6 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-healthcare-primary mb-2">My Appointments</h1>
        <p className="text-gray-600">Track and manage your healthcare appointments</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in delay-100">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-3xl font-bold text-healthcare-primary">{appointments.length}</div>
          <div className="text-base text-gray-600">Total Appointments</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {appointments.filter(a => !a.cancelled && !a.payment && !a.isCompleted).length}
          </div>
          <div className="text-base text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {appointments.filter(a => a.payment && !a.isCompleted).length}
          </div>
          <div className="text-base text-gray-600">Paid</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-3xl font-bold text-green-600">
            {appointments.filter(a => a.isCompleted).length}
          </div>
          <div className="text-base text-gray-600">Completed</div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {appointments.length === 0 ? (
          <div className="text-center py-12 animate-fade-in delay-200">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Appointments Yet</h3>
            <p className="text-gray-500 mb-6">You haven't booked any appointments yet.</p>
            <button
              onClick={() => navigate("/doctors")}
              className="bg-healthcare-primary text-white px-8 py-4 rounded-full hover:bg-healthcare-secondary transform hover:scale-105 transition-all duration-300 shadow-sm font-semibold text-lg"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="w-48 h-48 object-cover rounded-xl shadow-sm"
                      src={item.docData.image || uploadArea}
                      alt={item.docData.name}
                      onError={e => { e.target.src = uploadArea; }}
                    />
                    <div className="absolute -top-2 -right-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(item)}`}>
                        {getStatusIcon(item)} {getStatusText(item)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-healthcare-primary mb-2">
                        {item.docData.name}
                      </h3>
                      <p className="text-gray-600 font-medium text-lg mb-1">{item.docData.speciality}</p>
                      <p className="text-gray-500 text-base mb-3">{item.docData.degree}</p>
                      
                      <div className="space-y-1">
                        <p className="text-gray-700 font-medium text-lg">📍 Address:</p>
                        <p className="text-gray-600 text-base">{item.docData.address.line1}</p>
                        <p className="text-gray-600 text-base">{item.docData.address.line2}</p>
                      </div>
                    </div>

                    <div>
                      <div className="bg-gray-50 rounded-lg p-5 mb-4">
                        <p className="text-gray-700 font-medium text-lg mb-2">📅 Date & Time:</p>
                        <p className="text-healthcare-primary font-semibold text-lg">
                          {slotDateFormat(item.slotDate)}
                        </p>
                        <p className="text-healthcare-primary font-semibold text-lg">
                          {item.slotTime}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-5">
                        <p className="text-gray-700 font-medium text-lg mb-1">💰 Amount:</p>
                        <p className="text-3xl font-bold text-blue-600">${item.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 justify-center">
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <>
                      <button
                        onClick={() => setPayment(item._id)}
                        className="bg-healthcare-primary text-white px-8 py-4 rounded-lg hover:bg-healthcare-secondary transform hover:scale-105 transition-all duration-300 shadow-sm font-semibold text-lg"
                      >
                        💳 Pay Online
                      </button>
                      {payment === item._id && (
                        <div ref={paypalRef} className="mt-2"></div>
                      )}
                    </>
                  )}
                  
                  {item.payment && (
                    <button className="bg-blue-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg" disabled>
                      ✅ Paid
                    </button>
                  )}

                  {item.isCompleted && (
                    <button className="bg-green-100 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg" disabled>
                      ✅ Completed
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && !item.payment && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-sm font-semibold text-lg"
                    >
                      ❌ Cancel Appointment
                    </button>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <button className="bg-red-100 text-red-600 px-8 py-4 rounded-lg font-semibold text-lg" disabled>
                      ❌ Cancelled
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAppointments
