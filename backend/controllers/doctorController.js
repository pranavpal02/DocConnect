import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    })
    res.json({ success: true, message: "Availablity Changed" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"])
    res.json({ success: true, doctors })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API to get booked slots for a specific doctor
const getBookedSlots = async (req, res) => {
  try {
    const { docId } = req.params
    // Get all active (not cancelled) appointments for this doctor
    const appointments = await appointmentModel.find({ 
      docId, 
      cancelled: false 
    }).select("slotDate slotTime")
    // Group appointments by date
    const bookedSlots = {}
    appointments.forEach(appointment => {
      if (!bookedSlots[appointment.slotDate]) {
        bookedSlots[appointment.slotDate] = []
      }
      bookedSlots[appointment.slotDate].push(appointment.slotTime)
    })
    res.json({ success: true, bookedSlots })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing credentials" });
    }
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor does not exist" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments for the logged-in doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    if (!doctorId) {
      return res.json({ success: false, message: "Doctor not authorized" });
    }
    const now = new Date();
    const todayStr = `${now.getDate()}_${now.getMonth()}_${now.getFullYear()}`;
    // Find all non-cancelled appointments for this doctor
    const appointments = await appointmentModel.find({
      docId: doctorId,
      cancelled: false
    }).sort({ date: 1 });
    // Split into today's and upcoming
    const todaysAppointments = appointments.filter(a => a.slotDate === todayStr);
    const upcomingAppointments = appointments.filter(a => a.slotDate > todayStr);
    res.json({
      success: true,
      todaysAppointments,
      upcomingAppointments,
      allAppointments: appointments
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for doctor to cancel an appointment
const doctorCancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.doctor?.id;
    if (!appointmentId || !doctorId) {
      return res.json({ success: false, message: "Missing data or not authorized" });
    }
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointment.docId !== doctorId) {
      return res.json({ success: false, message: "Not authorized to cancel this appointment" });
    }
    appointment.cancelled = true;
    await appointment.save();
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for doctor to mark an appointment as completed
const doctorMarkCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.doctor?.id;
    if (!appointmentId || !doctorId) {
      return res.json({ success: false, message: "Missing data or not authorized" });
    }
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointment.docId !== doctorId) {
      return res.json({ success: false, message: "Not authorized to update this appointment" });
    }
    appointment.isCompleted = true;
    await appointment.save();
    res.json({ success: true, message: "Appointment marked as completed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    if (!doctorId) {
      return res.json({ success: false, message: "Doctor not authorized" });
    }
    const doctor = await doctorModel.findById(doctorId).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, profile: doctor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    if (!doctorId) {
      return res.json({ success: false, message: "Doctor not authorized" });
    }
    const updateData = { ...req.body };
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    } else {
      delete updateData.password;
    }
    if (updateData.address && typeof updateData.address === 'string') {
      try {
        updateData.address = JSON.parse(updateData.address);
      } catch (e) {}
    }
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      updateData,
      { new: true }
    ).select("-password");
    if (!updatedDoctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, profile: updatedDoctor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { doctorList, changeAvailablity, getBookedSlots, loginDoctor, getDoctorAppointments, doctorCancelAppointment, doctorMarkCompleted, getDoctorProfile, updateDoctorProfile }
