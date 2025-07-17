import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    })
    res.json({ success: true, message: "Availablity Changed" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"])
    res.json({ success: true, doctors })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get booked slots for a specific doctor
const getBookedSlots = async (req, res) => {
  try {
    const { docId } = req.params
    // Get all active (not cancelled) appointments for this doctor
    const appointments = await appointmentModel.find({ 
      docId, 
      cancelled: false 
    }).select("slotDate slotTime")
    // Group appointments by date
    const bookedSlots = {}
    appointments.forEach(appointment => {
      if (!bookedSlots[appointment.slotDate]) {
        bookedSlots[appointment.slotDate] = []
      }
      bookedSlots[appointment.slotDate].push(appointment.slotTime)
    })
    res.json({ success: true, bookedSlots })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { doctorList, changeAvailablity, getBookedSlots }
