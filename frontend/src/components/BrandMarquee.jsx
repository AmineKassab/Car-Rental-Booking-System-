import React from "react";
import { assets } from "../assets/assets";

const BrandMarquee = () => {
  const brands = [
    { name: "Fiat", logo: assets.fiatLogo },
    { name: "Jeep", logo: assets.jeepLogo },
    { name: "Lamborghini", logo: assets.lamborghiniLogo },
    { name: "Audi", logo: assets.audiLogo },
    { name: "Seat", logo: assets.seatLogo },
    { name: "Porche", logo: assets.porcheLogo },
    { name: "LandRover", logo: assets.landRoverLogo },
    { name: "Skoda", logo: assets.skodaLogo },
    { name: "Mini", logo: assets.miniLogo },
  ];

  return (
    <div className="w-full -mt-28 sm:-mt-16 lg:-mt-0 overflow-hidden bg-textPrimary py-6">
      {/* Conteneur animé */}
      <div className="flex whitespace-nowrap animate-marquee">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[100px] sm:min-w-[140px] md:min-w-[180px] lg:min-w-[200px] px-4"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-12 h-12 sm:w-16 sm:h-16  object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
