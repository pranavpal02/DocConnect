import React, { useContext } from "react"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AdminContext } from "./context/AdminContext"
import { DoctorContext } from "./context/DoctorContext"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import Dashboard from "./pages/Admin/Dashboard"
import AllAppointments from "./pages/Admin/AllAppointments"
import AddDoctor from "./pages/Admin/AddDoctor"
import DoctorsList from "./pages/Admin/DoctorsList"
import DoctorDashboard from "./pages/Doctor/Dashboard"
import DoctorAppointments from "./pages/Doctor/Appointments"
import DoctorProfile from "./pages/Doctor/Profile"
import DoctorNavbar from "./components/DoctorNavbar"

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const location = useLocation()

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Routes>
        {/* Login page logic */}
        <Route
          path="/"
          element={
            aToken ? (
              <Navigate to="/admin-dashboard" replace />
            ) : dToken ? (
              <Navigate to="/doctor-dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        {/* Admin panel routes */}
        {aToken && (
          <>
            <Route
              path="/admin-dashboard"
              element={
                <>
                  <Navbar />
                  <div className="flex flex-col lg:flex-row items-start">
                    <Sidebar />
                    <main className="flex-1 w-full lg:w-auto">
                      <Dashboard />
                    </main>
                  </div>
                </>
              }
            />
            <Route
              path="/all-appointments"
              element={
                <>
                  <Navbar />
                  <div className="flex flex-col lg:flex-row items-start">
                    <Sidebar />
                    <main className="flex-1 w-full lg:w-auto">
                      <AllAppointments />
                    </main>
                  </div>
                </>
              }
            />
            <Route
              path="/add-doctor"
              element={
                <>
                  <Navbar />
                  <div className="flex flex-col lg:flex-row items-start">
                    <Sidebar />
                    <main className="flex-1 w-full lg:w-auto">
                      <AddDoctor />
                    </main>
                  </div>
                </>
              }
            />
            <Route
              path="/doctor-list"
              element={
                <>
                  <Navbar />
                  <div className="flex flex-col lg:flex-row items-start">
                    <Sidebar />
                    <main className="flex-1 w-full lg:w-auto">
                      <DoctorsList />
                    </main>
                  </div>
                </>
              }
            />
          </>
        )}
        {/* Doctor panel routes */}
        {dToken && (
          <>
            <Route path="/doctor-dashboard" element={<><DoctorNavbar /><DoctorDashboard /></>} />
            <Route path="/doctor-appointments" element={<><DoctorNavbar /><DoctorAppointments /></>} />
            <Route path="/doctor-profile" element={<><DoctorNavbar /><DoctorProfile /></>} />
          </>
        )}
        {/* Catch-all: redirect to / if route not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
