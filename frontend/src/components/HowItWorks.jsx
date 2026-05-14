import React from 'react'
import { assets } from "../assets/assets"
import Title from './Title'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import EastIcon from '@mui/icons-material/East';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const HowItWorks = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start max-w-[90%] mt-16 mx-auto gap-12 lg:gap-24">
      
      
      <div className="flex-1 ">
        <Title 
          title="How It Works" 
          subtitle="Get Behind The Wheel in Easy Minutes" 
          text="Browse our fleet and select the perfect vehicule for your needs. Reserve instantly with flexible dates and payment options" 
          direction="start"
          color="background" 
        />
        <hr className="mt-7 w-[90%] mx-auto border-0 h-[1px] bg-gradient-to-r from-transparent via-textSecondary to-transparent" />
        
        
        <div className="flex flex-col md:flex-row items-start mt-5 gap-y-10 md:gap-x-10">
          
          <div>
            <div className="bg-background rounded-full w-10 h-10 flex items-center justify-center">
              <BookmarksIcon className="text-textPrimary" />
            </div>
            <h2 className="mt-5 text-xl font-medium">Book Online</h2>
            <p className="mt-3 text-sm">
              Booking online has never been easier. With just a few clicks, you can explore our wide range of vehicles, compare options, and select the one that perfectly matches your needs. Enjoy flexible dates, secure payments, and instant confirmation for a smooth and stress-free experience.
            </p>
            <p className="text-sm mt-5 text-background font-medium">
              <a href="">
                Learn More <EastIcon fontSize="small" className="ml-1.5" />
              </a>
            </p>
          </div>

          
          <div>
            <div className="bg-background rounded-full w-10 h-10 flex items-center justify-center">
              <LegendToggleIcon className="text-textPrimary" />
            </div>
            <h2 className="mt-5 text-xl font-medium">Pick Up & Drive</h2>
            <p className="mt-3 text-sm">
              Pick up your car at the location that suits you best, with no hassle and no delays. Our streamlined process ensures that you get on the road quickly and comfortably. Drive away with confidence, knowing everything is set for your journey.
            </p>
            <p className="text-sm mt-5 text-background font-medium">
              <a href="">
                Learn More <EastIcon fontSize="small" className="ml-1.5" />
              </a>
            </p>
          </div>
        </div>

        
        <div className="mt-7 bg-background w-fit text-textPrimary px-3 py-2 rounded-full">
          <p className="text-sm flex items-center gap-2">
            JOIN OUR TEAM
            <span className="bg-textPrimary rounded-full text-background w-8 h-8 flex items-center justify-center -mr-2">
              <NorthEastIcon fontSize="small" />
            </span>
          </p>
        </div>
      </div>

      
      <div className="w-full lg:w-[330px] h-[250px] lg:h-[400px] mt-10 flex-shrink-0">
        <img 
          className="w-full h-full rounded-2xl shadow-lg object-cover" 
          src={assets.lexusImage} 
          alt="Car" 
        />
      </div>
    </div>
  )
}

export default HowItWorks
