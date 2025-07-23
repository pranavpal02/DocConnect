import express from "express"
import { doctorList, getBookedSlots, loginDoctor, getDoctorAppointments, doctorCancelAppointment, doctorMarkCompleted, getDoctorProfile, updateDoctorProfile } from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)
doctorRouter.get("/booked-slots/:docId", getBookedSlots)
doctorRouter.post("/login", loginDoctor)
// TODO: Add doctor auth middleware for /appointments
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments)
doctorRouter.post("/cancel-appointment", authDoctor, doctorCancelAppointment)
doctorRouter.post("/mark-completed", authDoctor, doctorMarkCompleted)
doctorRouter.get("/profile", authDoctor, getDoctorProfile)
doctorRouter.post("/profile", authDoctor, updateDoctorProfile)

export default doctorRouter
