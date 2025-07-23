import React, { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"

const AllAppointments = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-appointments", {
        headers: { aToken },
      })
      if (data.success) {
        setAppointments(data.appointments)
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
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      )
      if (data.success) {
        toast.success("Appointment cancelled successfully")
        getAllAppointments() // Refresh the list
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const formatSlotDate = (slotDate) => {
    const dateArray = slotDate.split("_")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">All Appointments</h1>
        <div className="text-sm text-gray-600">
          Total: {appointments.length} appointments
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {appointments.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Speciality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appointment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booked On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.userData?.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.userData?.email || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.docData?.name || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.docData?.speciality || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatSlotDate(appointment.slotDate)} | {appointment.slotTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${appointment.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.payment 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {appointment.payment ? 'Paid' : 'Pending Payment'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this appointment?')) {
                              cancelAppointment(appointment._id)
                            }
                          }}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              {appointments.map((appointment, index) => (
                <div key={index} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                  <div className="space-y-3">
                    {/* Patient Info */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                      <p className="text-sm font-semibold text-gray-900">
                        {appointment.userData?.name || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.userData?.email || "N/A"}
                      </p>
                    </div>

                    {/* Doctor Info */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                      <p className="text-sm font-semibold text-gray-900">
                        {appointment.docData?.name || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.docData?.speciality || "N/A"}
                      </p>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Appointment Date</h3>
                        <p className="text-sm text-gray-900">
                          {formatSlotDate(appointment.slotDate)}
                        </p>
                        <p className="text-xs text-gray-500">{appointment.slotTime}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Booked On</h3>
                        <p className="text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>

                    {/* Amount and Status */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                        <p className="text-sm font-semibold text-gray-900">
                          ${appointment.amount}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.payment 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {appointment.payment ? 'Paid' : 'Pending Payment'}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this appointment?')) {
                            cancelAppointment(appointment._id)
                          }
                        }}
                        className="w-full text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors text-sm font-medium"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
