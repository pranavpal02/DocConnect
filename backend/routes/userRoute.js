// userRoute.js
import express from "express"
import {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"

const userRouter = express.Router()

// Authentication routes
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", authUser, getUserProfile)

// Password reset routes
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password", resetPassword)

export default userRouter
