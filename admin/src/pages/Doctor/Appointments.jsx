import React, { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import axios from "axios"
import { toast } from "react-toastify"

const DoctorAppointments = () => {
  const { backendUrl, dToken } = useContext(DoctorContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { dtoken: dToken },
      })
      if (data.success) {
        setAppointments(data.allAppointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dtoken: dToken } }
      )
      if (data.success) {
        toast.success("Appointment cancelled successfully")
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const markCompleted = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/mark-completed",
        { appointmentId },
        { headers: { dtoken: dToken } }
      )
      if (data.success) {
        toast.success("Appointment marked as completed")
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
    // eslint-disable-next-line
  }, [dToken])

  const formatDate = (slotDate, slotTime) => {
    if (!slotDate) return "-"
    const [day, month, year] = slotDate.split("_")
    return `${day}/${Number(month) + 1}/${year} ${slotTime}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading appointments...</div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">My Appointments</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Patient</th>
              <th className="py-2">Date & Time</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2">{appt.userData?.name || "N/A"}</td>
                <td className="py-2">{formatDate(appt.slotDate, appt.slotTime)}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${appt.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {appt.isCompleted ? 'Completed' : 'Scheduled'}
                  </span>
                </td>
                <td className="py-2 flex gap-2">
                  {!appt.isCompleted && (
                    <>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => cancelAppointment(appt._id)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                        onClick={() => markCompleted(appt._id)}
                      >
                        Mark Completed
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DoctorAppointments 