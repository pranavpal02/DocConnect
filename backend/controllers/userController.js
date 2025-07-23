import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import crypto from "crypto"
import nodemailer from "nodemailer"

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // checking for all data to register user
    if (!name || !email || !password) {
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

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body || {}
    const finalUserId = userId || req.user?.id
    if (!finalUserId) {
      return res.json({
        success: false,
        message: "UserId not found in request",
      })
    }
    const userData = await userModel.findById(finalUserId).select("-password")
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      })
    }
    if (userData.image && !userData.image.startsWith('http') && !userData.image.startsWith('data:')) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      userData.image = `${baseUrl}/${userData.image}`
    }
    res.json({ success: true, userData })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to update user profile data
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body || {}
    const { name, phone, address, gender, dob } = req.body || {}
    const finalUserId = userId || req.user?.id
    if (!finalUserId) {
      return res.json({
        success: false,
        message: "UserId not found in request",
      })
    }
    const updateData = {}
    if (name) updateData.name = name
    if (phone) updateData.phone = phone
    if (address) {
      try {
        updateData.address = JSON.parse(address)
      } catch (error) {
        updateData.address = address
      }
    }
    if (gender) updateData.gender = gender
    if (dob) updateData.dob = dob
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      updateData.image = `${baseUrl}/${req.file.path}`
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      finalUserId,
      updateData,
      { new: true }
    ).select("-password")
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      })
    }
    res.json({ success: true, userData: updatedUser })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to book appointment 
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body
    const finalUserId = userId || req.user?.id
    if (!finalUserId) {
      return res.json({ success: false, message: 'User ID not found' })
    }
    if (!docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: 'Missing required fields' })
    }
    const docData = await doctorModel.findById(docId).select("-password")
    if (!docData) {
      return res.json({ success: false, message: 'Doctor not found' })
    }
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor Not Available' })
    }
    // Check if slot is already booked (by any non-cancelled appointment)
    const existing = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false
    })
    if (existing) {
      return res.json({ success: false, message: 'Slot Not Available' })
    }
    const userData = await userModel.findById(finalUserId).select("-password")
    if (!userData) {
      return res.json({ success: false, message: 'User not found' })
    }
    const appointmentData = {
      userId: finalUserId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()
    res.json({ success: true, message: 'Appointment Booked' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get all appointments for a user
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.json({ success: false, message: "UserId not found in request" });
    }
    const appointments = await appointmentModel.find({ userId, cancelled: false });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to request password reset
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "No user found with this email" });

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Reset your DocConnect password",
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`
    });
    res.json({ success: true, message: "Password reset email sent!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.json({ success: false, message: "Token and new password required" });
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.json({ success: false, message: "Invalid or expired token" });
    if (newPassword.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Password has been reset successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to cancel (delete) an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user?.id || req.body.userId;
    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID is required" });
    }
    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }
    // Find the appointment
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointment.userId !== userId) {
      return res.json({ success: false, message: "You can only cancel your own appointments" });
    }
    // Mark the appointment as cancelled
    appointment.cancelled = true;
    await appointment.save();
    return res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Simple payment simulation - just mark appointment as paid
const simulatePayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(400).json({ success: false, message: "Appointment not found" });
    }
    if (appointment.payment) {
      return res.status(400).json({ success: false, message: "Payment already completed" });
    }
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mark as paid
    appointment.payment = true;
    await appointment.save();
    res.json({ success: true, message: "Payment completed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
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
};
