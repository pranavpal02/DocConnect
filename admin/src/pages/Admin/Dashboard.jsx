import React, { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../context/AdminContext"
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

const Dashboard = () => {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [stats, setStats] = useState(null)
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const getDashboardStats = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard-stats", {
        headers: { aToken },
      })
      if (data.success) {
        setStats(data.stats)
        setRecentAppointments(data.recentAppointments)
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
    if (aToken) {
      getDashboardStats()
    }
  }, [aToken])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
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
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img src={assets.appointments_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Appointments</p>
              <p className="text-lg sm:text-2xl font-bold">{stats?.totalAppointments || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img src={assets.appointment_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Paid Appointments</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">{stats?.paidAppointments || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img src={assets.patient_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Pending Payments</p>
              <p className="text-lg sm:text-2xl font-bold text-orange-600">{stats?.pendingPayments || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img src={assets.earning_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">${stats?.totalRevenue || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img src={assets.appointments_icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Today's Appointments</p>
              <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats?.todaysAppointments || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Appointments</h2>
        {recentAppointments.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Patient</th>
                    <th className="text-left py-2">Doctor</th>
                    <th className="text-left py-2">Speciality</th>
                    <th className="text-left py-2">Date & Time</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">
                        <div>
                          <p className="font-medium">{appointment.userData?.name || "N/A"}</p>
                          <p className="text-sm text-gray-600">{appointment.userData?.email || "N/A"}</p>
                        </div>
                      </td>
                      <td className="py-2">{appointment.docData?.name || "N/A"}</td>
                      <td className="py-2">{appointment.docData?.speciality || "N/A"}</td>
                      <td className="py-2">{formatDate(appointment.date)}</td>
                      <td className="py-2 font-semibold">${appointment.amount}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.payment 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {appointment.payment ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {recentAppointments.map((appointment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                        <p className="text-sm font-semibold text-gray-900">
                          {appointment.userData?.name || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.userData?.email || "N/A"}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.payment 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {appointment.payment ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                      <p className="text-sm font-semibold text-gray-900">
                        {appointment.docData?.name || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.docData?.speciality || "N/A"}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                        <p className="text-sm text-gray-900">{formatDate(appointment.date)}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                        <p className="text-sm font-semibold text-gray-900">${appointment.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent appointments</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
