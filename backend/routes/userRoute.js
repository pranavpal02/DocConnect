// userRoute.js
import express from "express"
import { registerUser, loginUser } from "../controllers/userController.js"

const userRouter = express.Router()

// Authentication routes
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

export default userRouter
