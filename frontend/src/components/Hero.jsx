import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <>
    <div className='py-10 px-6 flex justify-between items-start text-textPrimary'>
        <div className=' md:w-5/12'>
            <p className='text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight '>Drive Smart, Save Money, Travel With Freedom</p>
            <p className='mt-4 text-md text-sm md:text-base text-gray-300 leading-relaxed'>Book instantly online, choose from economy to luxury cars, enjoy transparent pricing, unlimited mileage, and excellent customer service designed to make your driving experience unforgettable.</p>
        </div>
        
    </div>

    <div className='mt-2 font-semibold px-6 '>
      <p className='text-textPrimary'>see category</p>
      <div className="mt-3 flex space-x-2">
        {[
          { name: "Mercedes", logo: assets.mercedesLogo },
          { name: "Honda", logo: assets.hondaLogo },
          { name: "Renault", logo: assets.renaultLogo },
          { name: "Volkswagen", logo: assets.volkswagenLogo },
        ].map((brand) => (
          <div
            key={brand.name}
            className="group h-14 min-w-14 border-2 border-gray-800 rounded-full 
                      flex items-center gap-3 overflow-hidden 
                      transition-all duration-300 hover:bg-accent px-2"
          >
            {/* Logo */}
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-secondary">
              <img
                className="w-7 h-7 object-contain"
                src={brand.logo}
                alt={brand.name}
              />
            </div>

            
            <span className="whitespace-nowrap hidden group-hover:inline text-secondary font-medium transition-opacity duration-300">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default Hero