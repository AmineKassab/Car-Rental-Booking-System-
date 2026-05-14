// CarBox.jsx
import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Link } from "react-router";

const CarBox = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-[280px] sm:w-[240px] md:w-[280px] flex flex-col flex-shrink-0">
      
      <img
        src={car.image[0]}
        alt={car.model}
        className="w-full h-40 object-cover rounded-xl"
      />

      
      <h3 className="text-lg font-semibold text-gray-900 mt-3">
        {car.brand} {car.model}
      </h3>

      
      <hr className="my-3 border-gray-200" />

      
      <div className="flex flex-wrap gap-2 justify-between text-sm text-background font-normal">
        <div className="flex items-center gap-2 px-2 bg-gray-100 rounded-full">
          <AirlineSeatReclineNormalIcon fontSize="small" />
          <span>{car.seats} Seats</span>
        </div>

        <div className="flex items-center gap-2 px-2 bg-gray-100 rounded-full">
          <SettingsIcon fontSize="small" />
          <span>{car.transmission}</span>
        </div>

        <div className="flex items-center gap-2 px-2 bg-gray-100 rounded-full">
          <LocalGasStationIcon fontSize="small" />
          <span>{car.fuelType}</span>
        </div>

        <div className="flex items-center gap-2 px-2 bg-gray-100 rounded-full">
          <DirectionsCarIcon fontSize="small" />
          <span>{car.type}</span>
        </div>
      </div>

      
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold text-gray-900">
          ${car.pricePerDay}{" "}
          <span className="text-xs text-gray-400">/day</span>
        </p>
        <Link to={`/cars/${car._id}`}>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-textPrimary text-xs sm:text-sm rounded-full hover:bg-gray-800 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarBox;
