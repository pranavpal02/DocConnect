import jwt from "jsonwebtoken"

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  const { dtoken } = req.headers

  if (!dtoken) {
    return res.json({ success: false, message: "Not Authorized Login Again" })
  }

  try {
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
    if (!req.doctor) req.doctor = {}
    req.doctor.id = token_decode.id
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default authDoctor 