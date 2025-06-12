import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check for missing details
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" })
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email address",
      })
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      })
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      })
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({ success: true, token, message: "Account created successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Server error. Please try again." })
  }
}

// API for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for missing details
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      })
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email address",
      })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })
      res.json({ success: true, token, message: "Login successful" })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Server error. Please try again." })
  }
}

// API to get user profile (optional - for authentication verification)
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await userModel.findById(userId).select("-password")

    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Server error" })
  }
}

export { registerUser, loginUser, getUserProfile }
