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
      <div className="max-w-2xl mx-auto bg-healthcare-light rounded-xl shadow-md p-6 sm:p-10 mt-6 text-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-healthcare-light rounded-xl shadow-md p-6 sm:p-10 mt-6 text-sm text-[#262626]">
      <div className="flex flex-col items-center gap-4">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              className="w-36 rounded-full border-4 border-healthcare-primary shadow transition hover:opacity-80"
              src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
              alt="profile"
              onError={(e) => e.target.src = assets.profile_pic}
            />
            <img
              className="w-8 absolute bottom-2 right-2"
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
          <img
            className="w-36 h-36 object-cover border-4 border-healthcare-primary shadow rounded-full"
            src={userData.image || assets.profile_pic}
            alt="profile"
            onError={(e) => e.target.src = assets.profile_pic}
          />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-2xl font-semibold text-center px-2 py-1 rounded"
            type="text"
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={formData.name}
          />
        ) : (
          <p className="font-semibold text-2xl text-healthcare-primary mt-2">
            {userData.name}
          </p>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Contact Information */}
      <div>
        <p className="text-gray-600 font-semibold underline mb-3">
          Contact Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-gray-800">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 px-2 py-1 rounded"
              type="text"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              value={formData.phone}
            />
          ) : (
            <p className="text-blue-600">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50 px-2 py-1 rounded"
                type="text"
                placeholder="Address Line 1"
                onChange={(e) => handleInputChange("address.line1", e.target.value)}
                value={formData.address.line1}
              />
              <input
                className="bg-gray-50 px-2 py-1 rounded"
                type="text"
                placeholder="Address Line 2"
                onChange={(e) => handleInputChange("address.line2", e.target.value)}
                value={formData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address?.line1 || "Not provided"} <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Basic Info */}
      <div>
        <p className="text-gray-600 font-semibold underline mb-3">
          Basic Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-gray-800">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-50 px-2 py-1 rounded"
              onChange={(e) => handleInputChange("gender", e.target.value)}
              value={formData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 px-2 py-1 rounded"
              type="date"
              onChange={(e) => handleInputChange("dob", e.target.value)}
              value={formData.dob}
            />
          ) : (
            <p className="text-gray-600">{userData.dob || "Not provided"}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {isEdit ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="border border-healthcare-primary px-8 py-2 rounded-full hover:bg-healthcare-primary hover:text-white transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="border border-gray-400 px-8 py-2 rounded-full hover:bg-gray-400 hover:text-white transition disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-healthcare-primary px-8 py-2 rounded-full hover:bg-healthcare-primary hover:text-white transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
