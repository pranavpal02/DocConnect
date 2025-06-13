import React, { useState, useContext, useEffect } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [state, setState] = useState("Sign Up") // "Sign Up", "Login", "Forgot Password", "Reset Password"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const { token, setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  // Check for reset token in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get("token")
    if (tokenFromUrl) {
      setResetToken(tokenFromUrl)
      setState("Reset Password")
    }
  }, [])

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      let response

      if (state === "Sign Up") {
        // Registration API call
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        })
      } else if (state === "Login") {
        // Login API call
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        })
      } else if (state === "Forgot Password") {
        // Forgot password API call
        response = await axios.post(`${backendUrl}/api/user/forgot-password`, {
          email,
        })
      } else if (state === "Reset Password") {
        // Reset password API call
        if (newPassword !== confirmPassword) {
          setMessage("Passwords do not match")
          setLoading(false)
          return
        }
        if (newPassword.length < 8) {
          setMessage("Password must be at least 8 characters long")
          setLoading(false)
          return
        }
        response = await axios.post(`${backendUrl}/api/user/reset-password`, {
          token: resetToken,
          newPassword,
        })
      }

      if (response.data.success) {
        if (state === "Sign Up" || state === "Login") {
          // Set token in context (this will also update localStorage)
          setToken(response.data.token)
          setMessage(
            `${
              state === "Sign Up" ? "Account created" : "Login"
            } successful! Redirecting...`
          )

          // Clear form
          setName("")
          setEmail("")
          setPassword("")

          // Navigate to home page after short delay
          setTimeout(() => {
            navigate("/")
          }, 1500)
        } else if (state === "Forgot Password") {
          setMessage(
            "Password reset link sent to your email. Please check your inbox."
          )
          // Clear email field
          setEmail("")
        } else if (state === "Reset Password") {
          setMessage("Password reset successful! Redirecting to login...")
          // Clear form
          setNewPassword("")
          setConfirmPassword("")
          setResetToken("")
          // Switch to login after delay
          setTimeout(() => {
            setState("Login")
            setMessage("")
          }, 2000)
        }
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    if (state === "Forgot Password") {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600">
              Enter your email address and we'll send you a reset link
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("Login")
                  setMessage("")
                }}
                className="text-blue-500 hover:text-blue-700 font-medium underline focus:outline-none"
              >
                Sign in here
              </button>
            </p>
          </div>
        </>
      )
    }

    if (state === "Reset Password") {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-center text-gray-600">Enter your new password</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              type="password"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </>
      )
    }

    // Default Sign Up / Login form
    return (
      <>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            {state === "Sign Up" ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-center text-gray-600">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book
            appointments
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required={state === "Sign Up"}
              disabled={loading}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            disabled={loading}
          />
          {state === "Sign Up" && (
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          )}
          {state === "Login" && (
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => {
                  setState("Forgot Password")
                  setMessage("")
                }}
                className="text-sm text-blue-500 hover:text-blue-700 underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : state === "Sign Up" ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <div className="text-center">
          {state === "Sign Up" ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("Login")
                  setMessage("")
                }}
                className="text-blue-500 hover:text-blue-700 font-medium underline focus:outline-none"
              >
                Sign in here
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("Sign Up")
                  setMessage("")
                }}
                className="text-blue-500 hover:text-blue-700 font-medium underline focus:outline-none"
              >
                Create one here
              </button>
            </p>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Display messages */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-center text-sm ${
                message.includes("successful") || message.includes("sent")
                  ? "bg-green-100 border border-green-300 text-green-700"
                  : "bg-red-100 border border-red-300 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {renderForm()}
        </div>
      </form>
    </div>
  )
}

export default Login