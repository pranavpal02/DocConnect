import React, { useState, useContext, useEffect } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const MyProfile = () => {
  const { userData, updateUserProfile } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "Not Selected",
    dob: "",
  })
  const [loading, setLoading] = useState(false)

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "",
      })
    }
  }, [userData])

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSave = async () => {
    setLoading(true)
    
    const data = new FormData()
    data.append("name", formData.name)
    data.append("phone", formData.phone)
    data.append("address", JSON.stringify(formData.address))
    data.append("gender", formData.gender)
    data.append("dob", formData.dob)
    
    if (image) {
      data.append("image", image)
    }

    const success = await updateUserProfile(data)
    
    if (success) {
      setIsEdit(false)
      setImage(null)
    }
    
    setLoading(false)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setImage(null)
    // Reset form data to current user data
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "",
      })
    }
  }

  if (!userData) {
    return (
      <div className="w-full bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-sm p-8 mt-6 text-center animate-pulse">
        <div className="w-16 h-16 bg-healthcare-primary/20 rounded-full mx-auto mb-4 animate-spin"></div>
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-healthcare-light to-gray-100 rounded-xl shadow-sm p-6 sm:p-10 mt-6 text-base text-[#262626] animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-healthcare-primary mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      {/* Profile Image and Name Section */}
      <div className="flex flex-col items-center gap-6 mb-8 animate-fade-in delay-100">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer group">
            <div className="relative">
              <img
                className="w-48 h-48 object-cover rounded-full border-4 border-healthcare-primary shadow-sm transition-all duration-300 group-hover:scale-105"
                src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                alt="profile"
                onError={(e) => e.target.src = assets.profile_pic}
              />
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Click to change</span>
              </div>
            </div>
            <img
              className="w-10 absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-sm"
              src={assets?.upload_icon || "https://via.placeholder.com/40"}
              alt="upload"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
          </label>
        ) : (
          <div className="relative group">
            <img
              className="w-48 h-48 object-cover border-4 border-healthcare-primary shadow-sm rounded-full transition-all duration-300 group-hover:scale-105"
              src={userData.image || assets.profile_pic}
              alt="profile"
              onError={(e) => e.target.src = assets.profile_pic}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-healthcare-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {isEdit ? (
          <input
            className="bg-white text-3xl font-bold text-center px-6 py-3 rounded-lg border-2 border-healthcare-primary focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300"
            type="text"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={formData.name}
          />
        ) : (
          <div className="text-center">
            <p className="font-bold text-4xl text-healthcare-primary mb-1">
              {userData.name}
            </p>
            <p className="text-gray-500 text-sm">Member since {new Date().getFullYear()}</p>
          </div>
        )}
      </div>

      {/* Contact Information Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in delay-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-healthcare-primary/10 rounded-full flex items-center justify-center">
            <span className="text-healthcare-primary text-lg">📞</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 text-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-healthcare-primary">📧</span>
            <p className="font-semibold text-lg">Email:</p>
          </div>
          <p className="text-blue-600 font-medium text-lg">{userData.email}</p>

          <div className="flex items-center gap-2">
            <span className="text-healthcare-primary">📱</span>
            <p className="font-semibold text-lg">Phone:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300 text-lg"
              type="text"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              value={formData.phone}
            />
          ) : (
            <p className="text-blue-600 font-medium text-lg">{userData.phone}</p>
          )}

          <div className="flex items-center gap-2">
            <span className="text-healthcare-primary">📍</span>
            <p className="font-semibold text-lg">Address:</p>
          </div>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300 text-lg"
                type="text"
                placeholder="Address Line 1"
                onChange={(e) => handleInputChange("address.line1", e.target.value)}
                value={formData.address.line1}
              />
              <input
                className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300 text-lg"
                type="text"
                placeholder="Address Line 2"
                onChange={(e) => handleInputChange("address.line2", e.target.value)}
                value={formData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-600 text-lg">
              {userData.address?.line1 || "Not provided"} <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in delay-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-healthcare-primary/10 rounded-full flex items-center justify-center">
            <span className="text-healthcare-primary text-lg">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 text-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-healthcare-primary">⚧</span>
            <p className="font-semibold text-lg">Gender:</p>
          </div>
          {isEdit ? (
            <select
              className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300 text-lg"
              onChange={(e) => handleInputChange("gender", e.target.value)}
              value={formData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600 font-medium text-lg">{userData.gender}</p>
          )}

          <div className="flex items-center gap-2">
            <span className="text-healthcare-primary">🎂</span>
            <p className="font-semibold text-lg">Birthday:</p>
          </div>
          {isEdit ? (
            <input
              className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-healthcare-primary/50 transition-all duration-300 text-lg"
              type="date"
              onChange={(e) => handleInputChange("dob", e.target.value)}
              value={formData.dob}
            />
          ) : (
            <p className="text-gray-600 font-medium text-lg">{userData.dob || "Not provided"}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 animate-fade-in delay-400">
        {isEdit ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-healthcare-primary text-white px-10 py-4 rounded-full hover:bg-healthcare-secondary transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none shadow-sm font-semibold text-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-500 text-white px-10 py-4 rounded-full hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none shadow-sm font-semibold text-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-healthcare-primary text-white px-10 py-4 rounded-full hover:bg-healthcare-secondary transform hover:scale-105 transition-all duration-300 shadow-sm font-semibold text-lg"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
