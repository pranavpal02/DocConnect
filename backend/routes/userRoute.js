// userRoute.js
import express from "express"
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getMyAppointments,
  forgotPassword,
  resetPassword,
  cancelAppointment,
  simulatePayment,
} from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router()

// Authentication routes
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.put("/update-profile", authUser, upload.single("image"), updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, getMyAppointments);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/simulate-payment", authUser, simulatePayment)

export default userRouter
