import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

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
    console.log(error)
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
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// API to get user profile data
const getProfile = async (req, res) => {
  console.log("getProfile called")
  console.log("req.body:", req.body)
  console.log("req.body type:", typeof req.body)
  console.log("req.body keys:", Object.keys(req.body || {}))
  try {
    const { userId } = req.body || {} // Use req.user.id as fallback if userId is not in req.body
    const finalUserId = userId || req.user?.id
    
    console.log("userId from req.body:", userId)
    console.log("userId from req.user:", req.user?.id)
    console.log("finalUserId:", finalUserId)

    if (!finalUserId) {
      return res.json({
        success: false,
        message: "UserId not found in request",
      })
    }

    const userData = await userModel.findById(finalUserId).select("-password")
    console.log("userData found:", userData ? "Yes" : "No")

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      })
    }

    // Ensure image URL is a full URL if its a relative path
    if (userData.image && !userData.image.startsWith('http') && !userData.image.startsWith('data:')) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      userData.image = `${baseUrl}/${userData.image}`
    }

    res.json({ success: true, userData })
  } catch (error) {
    console.log("getProfile error:", error)
    res.json({ success: false, message: error.message })
  }
}

// API to update user profile data
const updateProfile = async (req, res) => {
  console.log("updateProfile called")
  console.log("req.body:", req.body)
  console.log("req.body type:", typeof req.body)
  console.log("req.body keys:", Object.keys(req.body || {}))
  console.log("req.file:", req.file)
  
  try {
    const { userId } = req.body || {}
    const { name, phone, address, gender, dob } = req.body || {}
    // Use req.user.id as fallback if userId is not in req.body
    const finalUserId = userId || req.user?.id
    
    console.log("userId from req.body:", userId)
    console.log("userId from req.user:", req.user?.id)
    console.log("finalUserId:", finalUserId)
    console.log("name:", name)
    console.log("phone:", phone)

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
      // Create full URL for the uploaded image
      const baseUrl = `${req.protocol}://${req.get('host')}`
      updateData.image = `${baseUrl}/${req.file.path}`
    }

    console.log("updateData:", updateData)

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
    console.log("updateProfile error:", error)
    res.json({ success: false, message: error.message })
  }
}

export { registerUser, loginUser, getProfile, updateProfile }
