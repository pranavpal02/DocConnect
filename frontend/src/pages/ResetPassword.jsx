import React, { useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppContext } from "../context/AppContext"

const ResetPassword = () => {
  const { backendUrl } = React.useContext(AppContext)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const token = new URLSearchParams(location.search).get("token")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
        token,
        newPassword,
      })
      if (data.success) {
        toast.success(data.message)
        navigate("/login")
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-healthcare-light px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full sm:max-w-md bg-white shadow-xl rounded-2xl p-8 text-gray-700 animate-fade-in"
      >
        <h2 className="text-2xl font-semibold text-healthcare-primary mb-2">Reset Password</h2>
        <input
          type="password"
          className="border px-3 py-2 rounded"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="border px-3 py-2 rounded"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-healthcare-primary text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword 