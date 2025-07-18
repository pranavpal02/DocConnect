import React, { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import axios from "axios"
import { toast } from "react-toastify"

const Profile = () => {
  const { backendUrl, dToken } = useContext(DoctorContext)
  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dtoken: dToken },
      })
      if (data.success) {
        setProfile(data.profile)
        setForm(data.profile)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/profile",
        form,
        { headers: { dtoken: dToken } }
      )
      if (data.success) {
        toast.success("Profile updated successfully")
        setProfile(data.profile)
        setEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfile()
    }
    // eslint-disable-next-line
  }, [dToken])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading profile...</div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">My Profile</h1>
      {!edit ? (
        <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <img src={profile.image} alt="" className="w-20 h-20 rounded-full object-cover border" />
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500">Speciality</p>
              <p className="font-medium">{profile.speciality}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Degree</p>
              <p className="font-medium">{profile.degree}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="font-medium">{profile.experience}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Fees</p>
              <p className="font-medium">${profile.fees}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">About</p>
              <p className="font-medium">{profile.about}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-medium">{profile.address?.line1} {profile.address?.line2}</p>
            </div>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded mt-4 w-max" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="bg-white p-6 rounded-lg shadow flex flex-col gap-4" onSubmit={updateProfile}>
          <div className="flex gap-4 items-center">
            <img src={form.image} alt="" className="w-20 h-20 rounded-full object-cover border" />
            {/* Image upload can be added here if needed */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <input className="border rounded p-2 w-full" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <input className="border rounded p-2 w-full" value={form.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Speciality</p>
              <input className="border rounded p-2 w-full" value={form.speciality || ""} onChange={e => setForm(f => ({ ...f, speciality: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Degree</p>
              <input className="border rounded p-2 w-full" value={form.degree || ""} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <input className="border rounded p-2 w-full" value={form.experience || ""} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Fees</p>
              <input className="border rounded p-2 w-full" type="number" value={form.fees || ""} onChange={e => setForm(f => ({ ...f, fees: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">About</p>
              <textarea className="border rounded p-2 w-full" value={form.about || ""} onChange={e => setForm(f => ({ ...f, about: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Address Line 1</p>
              <input className="border rounded p-2 w-full" value={form.address?.line1 || ""} onChange={e => setForm(f => ({ ...f, address: { ...f.address, line1: e.target.value } }))} />
              <p className="text-xs text-gray-500 mt-2">Address Line 2</p>
              <input className="border rounded p-2 w-full" value={form.address?.line2 || ""} onChange={e => setForm(f => ({ ...f, address: { ...f.address, line2: e.target.value } }))} />
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Password (leave blank to keep unchanged)</p>
              <input className="border rounded p-2 w-full" type="password" value={form.password || ""} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded" type="submit">Save</button>
            <button className="bg-gray-300 px-6 py-2 rounded" type="button" onClick={() => setEdit(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile 