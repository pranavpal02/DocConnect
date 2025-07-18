import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [state, setState] = useState("Sign Up")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken, fetchUserData } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const endpoint =
        state === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`

      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password }

      const { data } = await axios.post(endpoint, payload)

      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        await fetchUserData(data.token)
        toast.success(
          `${state === "Sign Up" ? "Account created" : "Login"} successfully!`
        )
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  const handleForgotPassword = async () => {
    setForgotLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email: forgotEmail })
      if (data.success) {
        toast.success(data.message)
        setShowForgot(false)
        setForgotEmail("")
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
    setForgotLoading(false)
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-healthcare-light px-4"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-md bg-white shadow-xl rounded-2xl p-8 text-gray-700 animate-fade-in">
        <div>
          <h2 className="text-3xl font-semibold text-healthcare-primary mb-1">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-sm text-muted">
            {state === "Sign Up"
              ? "Join us to book appointments"
              : "Welcome back! Please login"}
          </p>
        </div>

        {state === "Sign Up" && (
          <div>
            <label className="text-sm mb-1 block">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-healthcare-primary transition"
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div>
          <label className="text-sm mb-1 block">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-healthcare-primary transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-healthcare-primary transition"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="bg-healthcare-primary hover:bg-healthcare-secondary text-white font-medium py-2 rounded-md transition"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="text-sm text-center mt-2">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-healthcare-primary font-semibold underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              New here?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-healthcare-primary font-semibold underline cursor-pointer"
              >
                Create an account
              </span>
            </>
          )}
        </div>
        <div className="text-right text-xs mb-2">
          {state === "Login" && (
            <span
              className="text-healthcare-primary underline cursor-pointer"
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </span>
          )}
        </div>
        {showForgot && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xs flex flex-col gap-3">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  className="border px-3 py-2 rounded"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="bg-healthcare-primary text-white px-4 py-2 rounded w-full"
                    disabled={forgotLoading}
                    onClick={handleForgotPassword}
                  >
                    {forgotLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                  <button
                    type="button"
                    className="border px-4 py-2 rounded w-full"
                    onClick={() => setShowForgot(false)}
                    disabled={forgotLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default Login
