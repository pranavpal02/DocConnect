import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div className="bg-[#F8FAFF] text-[#262626] py-16 px-4 md:px-20">
      {/* Hero */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-semibold mb-4" data-aos="fade-up">
          About DocConnect
        </h1>
        <p
          className="text-gray-600 text-base max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          DocConnect is on a mission to make healthcare simple, accessible, and
          trustworthy. We are a team of healthcare professionals, technologists,
          and innovators, dedicated to improving your journey towards wellness.
        </p>
      </div>

      {/* Mission + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-4" data-aos="fade-right">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">
            We want to break down barriers between patients and quality
            healthcare. Whether it’s finding the right doctor, checking their
            availability, or booking an appointment, DocConnect is here to help.
          </p>
          <p className="text-gray-600">
            By leveraging secure technology and a vast network of trusted
            professionals, we ensure everyone has the power to make confident
            healthcare choices.
          </p>
        </div>
        <div data-aos="fade-left">
          <img
            src="/images/OurMission.jpg"
            alt="Our mission"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>

      {/* Our Vision + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div data-aos="fade-right">
          <img
            src="/images/OurVision.jpg"
            alt="Our vision"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
        <div className="space-y-4" data-aos="fade-left">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="text-gray-600">
            We envision a world where quality care is within everyone’s reach,
            regardless of location, language, or financial status. We believe
            technology can close the gap between people and the doctors they
            trust.
          </p>
          <p className="text-gray-600">
            Our platform is built to scale, to grow, and to empower communities
            across the globe to connect with top-tier medical talent.
          </p>
        </div>
      </div>

      {/* Why choose us - features */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4" data-aos="fade-up">
          Why Choose DocConnect?
        </h2>
        <p
          className="text-gray-600 text-base max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Thousands of patients trust DocConnect to make healthcare simpler and
          smarter.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            video: "/videos/verified-doctors.mp4",
            title: "Verified Doctors",
            desc: "All doctors are screened, verified, and continually reviewed.",
          },
          {
            video: "/videos/easy-booking.mp4",
            title: "Easy Booking",
            desc: "Book appointments within seconds, anytime, anywhere.",
          },
          {
            video: "/videos/trusted-reviews.mp4",
            title: "Trusted Reviews",
            desc: "Read real reviews from patients to make informed choices.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            data-aos="zoom-in"
            data-aos-delay={idx * 200}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-500 p-6 text-center"
          >
            {feature.video ? (
              <video
                src={feature.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
            ) : (
              <img src={feature.icon} className="w-16 mx-auto mb-4" alt="" />
            )}
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Work with us */}
      <div className="mt-24 text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4" data-aos="fade-up">
          Work With Us
        </h2>
        <p
          className="text-gray-600 text-base max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join a diverse, forward-thinking team shaping the future of
          healthcare.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right">
          <img
            src="/images/HeadQuaters.jpg"
            alt="Our headquarters"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
        <div className="space-y-4" data-aos="fade-left">
          <h3 className="text-2xl font-semibold">Our Headquarters</h3>
          <p className="text-gray-600">
            Located in Toronto, Canada, our headquarters is a hub of innovation
            and collaboration, bringing together top talent from around the
            world.
          </p>
          <h3 className="text-2xl font-semibold mt-6">Employee Benefits</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Flexible hybrid work culture</li>
            <li>Health & wellness programs</li>
            <li>Continuous learning & training</li>
            <li>Inclusive, diverse workplace</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-20 bg-healthcare-primary text-white text-center py-10 px-6 rounded-xl shadow-md"
        data-aos="fade-up"
      >
        <h3 className="text-2xl font-semibold mb-2">
          Want to be part of our mission?
        </h3>
        <p className="mb-4">
          We’re always looking for passionate people to help us build the future
          of healthcare.
        </p>
        <button className="bg-white text-healthcare-primary px-6 py-3 rounded-full font-medium shadow hover:bg-gray-100 transition">
          Join Our Team
        </button>
      </div>
    </div>
  )
}

export default About
