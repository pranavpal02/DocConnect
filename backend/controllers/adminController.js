import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { json } from "express"

//API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body
    const imageFile = req.file

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10) // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    })
    const imageUrl = imageUpload.secure_url

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()
    res.json({ success: true, message: "Doctor Added" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Total appointments
    const totalAppointments = await appointmentModel.countDocuments({ cancelled: false });
    
    // Paid appointments
    const paidAppointments = await appointmentModel.countDocuments({ 
      cancelled: false, 
      payment: true 
    });
    
    // Pending payments
    const pendingPayments = await appointmentModel.countDocuments({ 
      cancelled: false, 
      payment: false 
    });
    
    // Total revenue
    const paidAppointmentsData = await appointmentModel.find({ 
      cancelled: false, 
      payment: true 
    });
    const totalRevenue = paidAppointmentsData.reduce((sum, appointment) => sum + appointment.amount, 0);
    
    // Today's appointments
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todaysAppointments = await appointmentModel.countDocuments({
      cancelled: false,
      date: { $gte: todayStart.getTime(), $lt: todayEnd.getTime() }
    });

    // Recent appointments (last 5)
    const recentAppointments = await appointmentModel.find({ cancelled: false })
      .sort({ date: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalAppointments,
        paidAppointments,
        pendingPayments,
        totalRevenue,
        todaysAppointments
      },
      recentAppointments
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments for admin
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ cancelled: false })
      .sort({ date: -1 });
    
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for admin to cancel appointment
const adminCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID is required" });
    }
    
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    
    appointment.cancelled = true;
    await appointment.save();
    
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password")
    res.json({ success: true, doctors })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Doctor ID is required" });
    }
    
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    
    doctor.available = !doctor.available;
    await doctor.save();
    
    res.json({ 
      success: true, 
      message: `Doctor ${doctor.available ? 'made available' : 'made unavailable'} successfully` 
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, getDashboardStats, getAllAppointments, adminCancelAppointment, changeAvailability }
