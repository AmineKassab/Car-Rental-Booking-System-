import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Hero from '../components/Hero'
import SearchBox from '../components/SearchBox'
import BrandMarquee from '../components/BrandMarquee'
import CarSection from '../components/CarSection'
import Title from '../components/Title'
import HowItWorks from '../components/HowItWorks'
import WhyChooseUs from '../components/WhyChooseUs'
import Reviews from '../components/Reviews'

const Home = () => {
  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${assets.landingPageCar})` }}>
        <Navbar />
        <Hero />
          
      </div>
      <SearchBox />
      <BrandMarquee />
      <HowItWorks />
      <CarSection />
      <WhyChooseUs/>
      <Reviews/>

    </>
    
  )
}

export default Home