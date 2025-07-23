import jwt from "jsonwebtoken"

// user authentication middleware
const authUser = async (req, res, next) => {
  const { token } = req.headers

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" })
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    // Initialize req.body if it doesntexist
    if (!req.body) {
      req.body = {}
    }
    
    // Set userId in both req.body and req.user for compatibility
    req.body.userId = token_decode.id
    req.user = { id: token_decode.id }
    
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default authUser
