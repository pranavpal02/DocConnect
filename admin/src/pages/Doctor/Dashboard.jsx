import React, { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import axios from "axios"
import { toast } from "react-toastify"

const DoctorDashboard = () => {
  const { backendUrl, dToken } = useContext(DoctorContext)
  const [todaysAppointments, setTodaysAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { dtoken: dToken },
      })
      if (data.success) {
        setTodaysAppointments(data.todaysAppointments)
        setUpcomingAppointments(data.upcomingAppointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
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
        <div className="text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-gray-600 text-sm">Today's Appointments</p>
          <p className="text-2xl font-bold text-primary">{todaysAppointments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <p className="text-gray-600 text-sm">Upcoming Appointments</p>
          <p className="text-2xl font-bold text-green-600">{upcomingAppointments.length}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Next Appointments</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Patient</th>
              <th className="py-2">Date & Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...todaysAppointments, ...upcomingAppointments].slice(0, 5).map((appt, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2">{appt.userData?.name || "N/A"}</td>
                <td className="py-2">{formatDate(appt.slotDate, appt.slotTime)}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${appt.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {appt.isCompleted ? 'Completed' : 'Scheduled'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DoctorDashboard 