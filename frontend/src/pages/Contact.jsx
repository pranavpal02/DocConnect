import React from "react"

const Contact = () => {
  return (
    <div className="bg-healthcare-light min-h-screen px-6 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-4xl font-bold text-healthcare-primary mb-3">
          Contact Us
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-base">
          We’d love to hear from you. Whether you have questions, feedback, or
          need support, feel free to reach out. We value every message and
          strive to build a healthier tomorrow together.
        </p>
      </div>

      {/* Contact Form and Details */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* Contact Details */}
        <div
          className="flex-1 bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 p-8 rounded-xl shadow-lg space-y-4"
          data-aos="fade-right"
        >
          <h2 className="text-xl font-semibold text-healthcare-primary mb-4">
            Get in Touch
          </h2>
          <ul className="space-y-4 text-gray-700 text-base">
            <li className="flex gap-3 items-center">
              <span role="img" aria-label="phone">
                📞
              </span>
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex gap-3 items-center">
              <span role="img" aria-label="email">
                📧
              </span>
              <span>support@docconnect.com</span>
            </li>
            <li className="flex gap-3 items-center">
              <span role="img" aria-label="location">
                📍
              </span>
              <span>123 Healthcare Lane, Toronto, Canada</span>
            </li>
          </ul>
          <div className="mt-8 text-gray-700 space-y-2">
            <p>
              <strong>Business Hours:</strong> Mon - Fri, 9AM to 6PM
            </p>
            <p>
              <strong>Emergency Support:</strong> 24/7 Available
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="text-healthcare-primary hover:text-healthcare-accent transition"
            >
              🌐 Facebook
            </a>
            <a
              href="#"
              className="text-healthcare-primary hover:text-healthcare-accent transition"
            >
              🐦 Twitter
            </a>
            <a
              href="#"
              className="text-healthcare-primary hover:text-healthcare-accent transition"
            >
              📸 Instagram
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-500">
            Our support team will get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form
          className="flex-1 bg-white p-8 rounded-xl shadow-lg space-y-4"
          data-aos="fade-left"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-healthcare-primary"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-healthcare-primary"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-healthcare-primary"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-healthcare-primary text-white px-6 py-3 rounded-full hover:bg-healthcare-accent transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-healthcare-primary mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              How do I book an appointment?
            </h3>
            <p className="text-sm text-gray-700">
              You can book appointments through our easy-to-use online booking
              system or contact our support team directly.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              Can I cancel or reschedule?
            </h3>
            <p className="text-sm text-gray-700">
              Yes! Log in to your account to manage your bookings or reach out
              to support for help.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 text-gray-800">
              Do you offer emergency consultations?
            </h3>
            <p className="text-sm text-gray-700">
              We have 24/7 emergency telehealth support to address critical
              situations.
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto mt-16 px-6 pb-16">
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
