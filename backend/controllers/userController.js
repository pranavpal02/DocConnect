// userController.js
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import nodemailer from "nodemailer"
import User from "../models/userModel.js" // Adjust path as needed

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" })
    }

    // Password validation
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new User(userData)
    const user = await newUser.save()

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await User.findById(userId).select("-password")
    res.json({ success: true, user: userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
})

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.json({ success: false, message: "Email is required" })
    }

    // Check if user existsDocConnect
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        success: false,
        message: "User with this email does not exist",
      })
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex")
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Save reset token to user
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = resetTokenExpiry
    await user.save()

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/login?token=${resetToken}`

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request - ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You requested a password reset for your DocConnect account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p><strong>This link will expire in 10 minutes.</strong></p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 12px;">
            This email was sent from DocConnect. Please do not reply to this email.
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    })
  } catch (error) {
    console.log("Forgot password error:", error)
    res.json({ success: false, message: "Error sending reset email" })
  }
}

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.json({
        success: false,
        message: "Token and new password are required",
      })
    }

    // Password validation
    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      })
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired reset token",
      })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update user password and clear reset token
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()

    res.json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    console.log("Reset password error:", error)
    res.json({ success: false, message: "Error resetting password" })
  }
}

export {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
}