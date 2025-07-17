import mongoose from "mongoose"
import appointmentModel from "./models/appointmentModel.js"
import userModel from "./models/userModel.js"
import doctorModel from "./models/doctorModel.js"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

const fixAppointments = async () => {
  try {
    await connectDB()
    
    // Get all appointments
    const appointments = await appointmentModel.find({})
    console.log(`Found ${appointments.length} appointments`)
    
    let fixedCount = 0
    
    for (const appointment of appointments) {
      let needsUpdate = false
      
      // Check if userData is missing or incomplete
      if (!appointment.userData || !appointment.userData.name) {
        console.log(`Fixing userData for appointment ${appointment._id}`)
        const user = await userModel.findById(appointment.userId)
        if (user) {
          appointment.userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            dob: user.dob,
            image: user.image
          }
          needsUpdate = true
        } else {
          console.log(`User not found for appointment ${appointment._id}`)
        }
      }
      
      // Check if docData is missing or incomplete
      if (!appointment.docData || !appointment.docData.name) {
        console.log(`Fixing docData for appointment ${appointment._id}`)
        const doctor = await doctorModel.findById(appointment.docId)
        if (doctor) {
          appointment.docData = {
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            image: doctor.image,
            speciality: doctor.speciality,
            degree: doctor.degree,
            experience: doctor.experience,
            about: doctor.about,
            fees: doctor.fees,
            address: doctor.address,
            available: doctor.available
          }
          needsUpdate = true
        } else {
          console.log(`Doctor not found for appointment ${appointment._id}`)
        }
      }
      
      if (needsUpdate) {
        await appointment.save()
        fixedCount++
        console.log(`Fixed appointment ${appointment._id}`)
      }
    }
    
    console.log(`Fixed ${fixedCount} appointments`)
    
    // Show sample of fixed appointments
    const sampleAppointments = await appointmentModel.find({}).limit(3)
    console.log("Sample appointments after fix:")
    sampleAppointments.forEach((apt, index) => {
      console.log(`\nAppointment ${index + 1}:`)
      console.log(`  User: ${apt.userData?.name || 'N/A'} (${apt.userData?.email || 'N/A'})`)
      console.log(`  Doctor: ${apt.docData?.name || 'N/A'} (${apt.docData?.speciality || 'N/A'})`)
      console.log(`  Date: ${apt.slotDate} ${apt.slotTime}`)
      console.log(`  Amount: $${apt.amount}`)
      console.log(`  Payment: ${apt.payment ? 'Paid' : 'Pending'}`)
    })
    
    mongoose.connection.close()
    console.log("Database connection closed")
    
  } catch (error) {
    console.error("Error fixing appointments:", error)
    mongoose.connection.close()
  }
}

fixAppointments() 