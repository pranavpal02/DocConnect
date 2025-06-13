// Home.jsx
import React, { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const backendUrl = "http://localhost:4000"

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      // Redirect to login if no token
      window.location.href = "/login"
      return
    }

    // Fetch user data
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      })

      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token")
    // Redirect to login page
    window.location.href = "/login"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Your App
            </h1>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-gray-700">
                  Hello, <span className="font-medium">{user.name}</span>
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h2>
          <p className="text-lg text-gray-600 mb-8">
            You are successfully logged in!
          </p>

          {user && (
            <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Profile
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Account ID:</strong> {user._id}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home