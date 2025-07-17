import jwt from "jsonwebtoken"

// user authentication middleware
const authUser = async (req, res, next) => {
  console.log("Auth middleware called")
  console.log("Headers:", req.headers)

  const { token } = req.headers
  console.log("Token:", token)

  if (!token) {
    console.log("No token provided")
    return res.json({ success: false, message: "Not Authorized Login Again" })
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Token decoded:", token_decode)

    // Initialize req.body if it doesntexist
    if (!req.body) {
      req.body = {}
    }
    
    // Set userId in both req.body and req.user for compatibility
    req.body.userId = token_decode.id
    req.user = { id: token_decode.id }
    
    console.log("UserId added to req.body:", req.body.userId)
    console.log("UserId added to req.user:", req.user.id)

    next()
  } catch (error) {
    console.log("Token verification error:", error)
    res.json({ success: false, message: error.message })
  }
}

export default authUser
