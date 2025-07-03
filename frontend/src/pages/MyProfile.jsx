import React, { useState } from "react"
import { assets } from "../assets/assets"

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  // mock static data
  const [userData, setUserData] = useState({
    name: "Pranav Pal",
    email: "pal@example.com",
    phone: "123-456-7890",
    address: {
      line1: "123 Main Street",
      line2: "Apartment 4B",
    },
    gender: "Male",
    dob: "1995-06-15",
    image: assets.profile_pic,
  })

  return (
    <div className="max-w-2xl mx-auto bg-healthcare-light rounded-xl shadow-md p-6 sm:p-10 mt-6 text-sm text-[#262626]">
      <div className="flex flex-col items-center gap-4">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              className="w-36 rounded-full border-4 border-healthcare-primary shadow transition hover:opacity-80"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
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
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 object-cover border-4 border-healthcare-primary shadow"
            src={userData.image}
            alt="profile"
          />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-2xl font-semibold text-center"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
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
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
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
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="bg-gray-50 px-2 py-1 rounded"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address.line1} <br />
              {userData.address.line2}
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
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
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
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <button
            onClick={() => {
              setIsEdit(false)
              setImage(null)
            }}
            className="border border-healthcare-primary px-8 py-2 rounded-full hover:bg-healthcare-primary hover:text-white transition"
          >
            Save
          </button>
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
