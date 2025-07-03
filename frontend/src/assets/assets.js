import appointment_img from "./appointment_img.png"
import header_img from "./header_img.png"
import group_profiles from "./group_profiles.png"
import profile_pic from "./profile_pic.png"
import contact_image from "./contact_image.png"
import about_image from "./about_image.png"
import logo from "./logo.svg"
import dropdown_icon from "./dropdown_icon.svg"
import menu_icon from "./menu_icon.svg"
import cross_icon from "./cross_icon.png"
import chats_icon from "./chats_icon.svg"
import verified_icon from "./verified_icon.svg"
import arrow_icon from "./arrow_icon.svg"
import info_icon from "./info_icon.svg"
import upload_icon from "./upload_icon.png"
import stripe_logo from "./stripe_logo.png"
import razorpay_logo from "./razorpay_logo.png"
import doc1 from "./doc1.png"
import doc2 from "./doc2.png"
import doc3 from "./doc3.png"
import doc4 from "./doc4.png"
import doc5 from "./doc5.png"
import doc6 from "./doc6.png"
import doc7 from "./doc7.png"
import doc8 from "./doc8.png"
import doc9 from "./doc9.png"
import doc10 from "./doc10.png"
import doc11 from "./doc11.png"
import doc12 from "./doc12.png"
import doc13 from "./doc13.png"
import doc14 from "./doc14.png"
import doc15 from "./doc15.png"
import Dermatologist from "./Dermatologist.svg"
import Gastroenterologist from "./Gastroenterologist.svg"
import General_physician from "./General_physician.svg"
import Gynecologist from "./Gynecologist.svg"
import Neurologist from "./Neurologist.svg"
import Pediatricians from "./Pediatricians.svg"

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
}

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
]

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Aisha Tyagi",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Aisha Tyagi is dedicated to providing comprehensive primary care tailored to each patient’s unique needs. She focuses on prevention, lifestyle counseling, and long-term wellness planning. Her patients appreciate her approachable and thorough style of treatment. She believes strongly in empowering patients through education.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson specializes in women's health, including prenatal care and reproductive counseling. She guides patients through fertility and hormonal balance issues with empathy and skill. Her warm bedside manner is highly valued. She is passionate about preventive screenings for women's health.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel provides expertise in diagnosing and treating skin conditions like acne, rashes, and pigmentation. She combines cosmetic dermatology with evidence-based medical care. Her goal is to help patients feel confident in their skin. She is also trained in non-invasive cosmetic procedures.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Siara Khan",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Siara Khan is devoted to comprehensive child health, including growth monitoring and vaccinations. She promotes family-centered care with a focus on child nutrition. Parents appreciate her friendly, reassuring approach. She emphasizes early screening for developmental milestones.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia specializes in treating conditions such as migraines, epilepsy, and neuropathy. She combines advanced diagnostics with compassionate patient care. Her patients value her clear explanations of complex conditions. She stays up-to-date on the latest neurological research.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams focuses on rehabilitation after neurological injuries and managing cognitive disorders. He develops customized care plans for every patient. Families appreciate his patient education efforts. His clinical practice emphasizes teamwork with rehabilitation therapists.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Preksha Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Preksha Davis provides comprehensive general medicine with a focus on chronic disease prevention and management. She works with patients on lifestyle changes to improve overall health. Her listening skills build trust with patients. She also supports community health education initiatives.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White specializes in minimally invasive gynecologic surgeries and fertility management. He supports patients through all reproductive stages with evidence-based care. His calm and supportive manner is appreciated by patients. He regularly participates in women's health awareness programs.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell offers comprehensive skincare services including laser treatments and cosmetic dermatology. She focuses on restoring and maintaining healthy skin through personalized treatment plans. Patients find her compassionate approach reassuring. She continues to research innovative skin therapies.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King delivers holistic pediatric care focused on growth, development, and preventive health. He works with parents on behavior and nutrition strategies. Children enjoy his friendly, playful style. He is an advocate for early mental health awareness in kids.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly specializes in stroke management, neuroimaging, and movement disorders. She believes in empowering patients with clear explanations about their conditions. Her approachable style encourages shared decision-making. She actively participates in local neurology seminars.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris offers expert care for digestive and liver-related diseases. He performs advanced endoscopic procedures with a patient-first approach. People trust him for compassionate, evidence-based treatment. He emphasizes early screening for gastrointestinal cancers.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans believes in preventive healthcare and evidence-based chronic disease care. She partners with patients to build sustainable wellness plans. Her clinic prioritizes easy access and continuity of care. She enjoys promoting community health workshops.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez provides gynecologic care with a special focus on high-risk pregnancies and teen health. He is committed to empowering women with knowledge about their reproductive choices. Patients trust his open and respectful communication style. He also supports maternal mental health programs.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill treats eczema, psoriasis, and performs advanced allergy testing. She helps patients manage chronic skin conditions with holistic plans. Her patients feel heard and supported throughout their treatment. She regularly hosts skin-care education events.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
]
