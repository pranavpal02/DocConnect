import express from "express"
import { doctorList, getBookedSlots } from "../controllers/doctorController.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)
doctorRouter.get("/booked-slots/:docId", getBookedSlots)

export default doctorRouter
