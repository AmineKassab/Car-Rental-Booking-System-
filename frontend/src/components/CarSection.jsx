// CarSection.jsx
import React, { useEffect, useRef, useState } from "react";
import Title from "./Title";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router";
import CarBox from "./CarBox";

const CarSection = () => {
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/cars?type=${selectedType}`
        );
        if (res.data.success) {
          setCars(res.data.cars);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCars();
  }, [selectedType]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#1A1A1A] text-textPrimary mt-10 pb-16">
      
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto pt-10">
        <Title
          title="OUR COLLECTION"
          subtitle="Explore Our Vehicle Fleet"
          text="From automation to analytics, we provide everything you need to every occasion and style"
          direction="center"
          color="textPrimary"
        />
      </div>

      <div className="w-[90%] mx-auto">
        
        <div className="pt-10 flex flex-wrap justify-center items-center gap-3 pb-6">
          {["all", "city car", "convertible", "SUV", "sedan", "pickup", "minivan"].map(
            (type, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 cursor-pointer text-sm rounded-full border font-medium ${
                  selectedType === type
                    ? "bg-textPrimary text-background"
                    : "text-textPrimary"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            )
          )}
          <Link to="/cars">
            <p className="text-textSecondary ml-4 text-sm flex items-center">
              View More <EastIcon fontSize="small" />
            </p>
          </Link>
        </div>

        
        <div className="hidden  sm:flex justify-end gap-4">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 cursor-pointer rounded-full border flex items-center justify-center"
          >
            <WestIcon fontSize="small" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 cursor-pointer rounded-full border flex items-center justify-center"
          >
            <EastIcon fontSize="small" />
          </button>
        </div>

        
        <div
          ref={scrollRef}
          className="flex mt-10 gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {cars.length > 0 ? (
            cars.map((car) => <CarBox key={car._id} car={car} />)
          ) : (
            <p className="text-center w-full text-gray-400">No cars found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSection;
