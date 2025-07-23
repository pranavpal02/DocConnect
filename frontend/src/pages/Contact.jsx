import React, { useRef, useEffect, useState } from "react"
import drSejal from "../assets/dr-sejal.jpg"
import drPreksha from "../assets/dr-preksha.jpg"
import drPranav from "../assets/dr-pranav.jpg"
const team = [
  {
    name: "Dr. Pranav Pal",
    role: "Chief Medical Officer",
    img: drPranav,
    desc: "Expert in telehealth and patient care."
  },
  {
    name: "Dr. Preksha Mehta",
    role: "Lead Physician",
    img: drPreksha,
    desc: "Passionate about preventive medicine."
  },
  {
    name: "Navjot Kaur",
    role: "Support Lead",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    desc: "Ensures every patient feels heard."
  },
  {
    name: "Dr. Sejal Malhotra",
    role: "Senior Cardiologist",
    img: drSejal,
    desc: "Specialized in heart health and diagnostics."
  },
]

const whyChoose = [
  {
    icon: "💡",
    title: "Innovative Care",
    desc: "We use the latest technology to connect you with top doctors, anytime, anywhere."
  },
  {
    icon: "🤝",
    title: "Personalized Support",
    desc: "Our team listens and tailors solutions to your unique needs."
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    desc: "Your data and conversations are always protected with us."
  },
]

const Contact = () => {
  const videoRef = useRef(null)
  const [videoInView, setVideoInView] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVideoInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    if (videoRef.current) observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (videoInView) videoRef.current.play()
      else videoRef.current.pause()
    }
  }, [videoInView])

  return (
    <div className="bg-healthcare-light min-h-screen px-6 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12 px-6" data-aos="fade-down">
        <h1 className="text-4xl font-bold text-healthcare-primary mb-3 animate-fade-in">
          Contact Us
        </h1>
        <p className="text-gray-700 max-w-4xl mx-auto text-base animate-fade-in delay-100">
          We'd love to hear from you. Whether you have questions, feedback, or need support, feel free to reach out. We value every message and strive to build a healthier tomorrow together.
        </p>
      </div>

      {/* Get in Touch - Full Width */}
      <div className="w-full mb-16">
        <div
          className="w-full flex flex-col justify-center items-center bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 px-2 sm:px-8 py-10 rounded-none sm:rounded-xl shadow-2xl space-y-6 min-h-[400px] animate-slide-in-up"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-semibold text-healthcare-primary mb-2 text-center animate-fade-in">
            Get in Touch
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg w-full max-w-md mx-auto">
            <li className="flex gap-3 items-center justify-center animate-fade-in delay-100">
              <span role="img" aria-label="phone">📞</span>
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex gap-3 items-center justify-center animate-fade-in delay-200">
              <span role="img" aria-label="email">📧</span>
              <span>support@docconnect.com</span>
            </li>
            <li className="flex gap-3 items-center justify-center animate-fade-in delay-300">
              <span role="img" aria-label="location">📍</span>
              <span>123 Healthcare Lane, Toronto, Canada</span>
            </li>
            <li className="flex gap-3 items-center justify-center animate-fade-in delay-400">
              <span role="img" aria-label="whatsapp">💬</span>
              <span>WhatsApp: +1 (234) 567-891</span>
            </li>
            <li className="flex gap-3 items-center justify-center animate-fade-in delay-500">
              <span role="img" aria-label="linkedin">🔗</span>
              <span>LinkedIn: <a href="#" className="text-healthcare-primary underline">DocConnect</a></span>
            </li>
          </ul>
          <div className="mt-6 text-gray-700 space-y-2 text-center animate-fade-in delay-600">
            <p>
              <strong>Business Hours:</strong> Mon - Fri, 9AM to 6PM
            </p>
            <p>
              <strong>Emergency Support:</strong> 24/7 Available
            </p>
          </div>
          <div className="flex gap-6 mt-6 justify-center animate-bounce">
            <a href="#" className="text-healthcare-primary hover:text-healthcare-accent transition text-2xl">🌐</a>
            <a href="#" className="text-healthcare-primary hover:text-healthcare-accent transition text-2xl">🐦</a>
            <a href="#" className="text-healthcare-primary hover:text-healthcare-accent transition text-2xl">📸</a>
          </div>
          <div className="mt-8 w-full space-y-4">
            <div className="bg-white/80 rounded-lg p-4 shadow animate-fade-in delay-700 w-full">
              <h3 className="text-lg font-semibold text-healthcare-primary mb-1">Why Contact Us?</h3>
              <p className="text-gray-700 text-base">Our team is dedicated to providing you with the best healthcare experience. Whether you need help booking an appointment, want to give feedback, or just have a question, we're here for you. Your voice helps us grow and serve you better.</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 shadow animate-fade-in delay-800 w-full">
              <h3 className="text-lg font-semibold text-healthcare-primary mb-1">Our Promise</h3>
              <p className="text-gray-700 text-base">We promise a prompt, friendly, and helpful response to every inquiry. Your health and satisfaction are our top priorities.</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 shadow animate-fade-in delay-900 w-full">
              <h3 className="text-lg font-semibold text-healthcare-primary mb-1">Stay Connected</h3>
              <p className="text-gray-700 text-base">Follow us on social media for health tips, updates, and community stories. Subscribe to our newsletter for exclusive content and offers!</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-500 text-center animate-fade-in delay-1000">
            Our support team will get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="w-full mb-16 px-6">
        <h2 className="text-2xl font-semibold text-healthcare-primary mb-8 text-center animate-fade-in">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, idx) => (
            <div key={member.name} className={`bg-white rounded-xl shadow-lg p-6 w-64 flex flex-col items-center animate-fade-in delay-${(idx+1)*200}`}>
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-3 border-4 border-healthcare-primary shadow-md" />
              <h3 className="text-lg font-bold text-healthcare-primary mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{member.role}</p>
              <p className="text-xs text-gray-500 text-center">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full mb-16 px-6">
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-black/40 z-10 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">Experience Healthcare in Motion</h2>
            <p className="text-lg text-white/90 mb-6 animate-fade-in delay-200">See how DocConnect is transforming care for everyone, everywhere.</p>
          </div>
          <video
            ref={videoRef}
            src="https://videos.pexels.com/video-files/8381442/8381442-uhd_2560_1440_25fps.mp4"
            className="w-full h-[400px] object-cover"
            muted
            loop
            playsInline
            preload="auto"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full mt-16 px-6">
        <h2 className="text-2xl font-semibold text-healthcare-primary mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              How do I book an appointment?
            </h3>
            <p className="text-sm text-gray-700">
              You can book appointments through our easy-to-use online booking system or contact our support team directly.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              Can I cancel or reschedule?
            </h3>
            <p className="text-sm text-gray-700">
              Yes! Log in to your account to manage your bookings or reach out to support for help.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              Do you offer emergency consultations?
            </h3>
            <p className="text-sm text-gray-700">
              We have 24/7 emergency telehealth support to address critical situations.
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full mt-16 px-6 pb-16">
        <h2 className="text-2xl font-semibold text-healthcare-primary mb-6">
          Find us on the map
        </h2>
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            title="DocConnect Location"
            src="https://maps.google.com/maps?q=Toronto,%20Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-96 border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact
