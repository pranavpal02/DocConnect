import React from "react"
import Header from "../components/Header"
import SpecialityMenu from "../components/SpecialityMenu"
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-6 py-12 space-y-12">
        <div>
          <Header />
        </div>
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
      </div>
    </div>
  )
}

export default Home
