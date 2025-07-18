import express from "express"
import { addDoctor, loginAdmin, allDoctors, getDashboardStats, getAllAppointments, adminCancelAppointment, changeAvailability } from "../controllers/adminController.js"
import authAdmin from "../middlewares/authAdmin.js"
import upload from "../middlewares/multer.js"

const adminRouter = express.Router()

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.get("/dashboard-stats", authAdmin, getDashboardStats)
adminRouter.get("/all-appointments", authAdmin, getAllAppointments)
adminRouter.post("/cancel-appointment", authAdmin, adminCancelAppointment)
adminRouter.post("/change-availability", authAdmin, changeAvailability)

export default adminRouter
