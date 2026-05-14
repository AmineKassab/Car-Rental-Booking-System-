import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedinIcon from "@mui/icons-material/LinkedIn";
import XIcon from '@mui/icons-material/X';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] mx-auto text-gray-300 pt-12 pb-6 mt-28 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-3 lg:grid-cols-[1.5fr_auto_auto_auto_1fr] gap-8">

        
        
        <div className="text-left ">
          <div>
            <img src={assets.logo} alt="RentCar Logo" className="w-32 h-auto" />
          </div>
          <p className="mt-10 text-left text-sm leading-relaxed">
            Affordable rentals, premium vehicles, and 24/7 support for your journey.
          </p>
          <div className="flex space-x-4 mt-8">
            <a href="https://www.facebook.com/amine.kassab.77/" target="_blank"  className="hover:text-accent transition-colors duration-300">
              <FacebookRoundedIcon className="!text-3xl" />
            </a>
            <a href="https://www.linkedin.com/in/kassab-mohamed-amine-19000a365/" target="_blank"   className="hover:text-accent transition-colors duration-300">
              <LinkedinIcon className="!text-3xl" />
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300">
              <XIcon className="!text-3xl" />
            </a>
          </div>
        </div>

        
        <div className="min-w-fit text-left md:text-center">
          <h3 className="text-lg font-semibold text-white whitespace-nowrap">Rental Services</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="whitespace-nowrap hover:text-accent transition-colors duration-200 cursor-pointer">Car Rentals</li>
            <li className="whitespace-nowrap hover:text-accent transition-colors duration-200 cursor-pointer">Long-Term Leasing</li>
            <li className="whitespace-nowrap hover:text-accent transition-colors duration-200 cursor-pointer">Luxury Cars</li>
            <li className="whitespace-nowrap hover:text-accent transition-colors duration-200 cursor-pointer">Chauffeur Service</li>
          </ul>
        </div>

      
        <div className="min-w-fit text-left md:text-center">
          <h3 className="text-lg font-semibold text-white whitespace-nowrap">Legal Information</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="whitespace-nowrap">
              <a href="/terms" className="hover:text-accent transition-colors duration-200">Terms & Conditions</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="/privacy" className="hover:text-accent transition-colors duration-200">Privacy Policy</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="/insurance" className="hover:text-accent transition-colors duration-200">Insurance Policy</a>
            </li>
            <li className="whitespace-nowrap">
              <a href="/refunds" className="hover:text-accent transition-colors duration-200">Refund & Cancellation</a>
            </li>
          </ul>
        </div>

        <div className="min-w-fit text-left md:text-center">
          <h3 className="text-lg font-semibold text-white whitespace-nowrap">Get in Touch</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-center whitespace-nowrap">
              <LocationOnOutlinedIcon className="mr-2 text-accent !text-xl flex-shrink-0" /> 
              <span>123 Main St, Algiers</span>
            </li>
            <li className="flex items-center whitespace-nowrap">
              <LocalPhoneOutlinedIcon className="mr-2 text-accent !text-xl flex-shrink-0" /> 
              <span>+213 555 123 456</span>
            </li>
            <li className="flex items-center whitespace-nowrap">
              <EmailOutlinedIcon className="mr-2 text-accent !text-xl flex-shrink-0" /> 
              <span>nm_kassab@esi.dz</span>
            </li>
          </ul>
        </div>

       
        <div className="text-left md:text-center">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="mt-5 text-sm">Get the latest updates and offers.</p>
          <form className="mt-4 flex items-center md:mx-auto w-[80%] sm:w-[70%] md:w-full lg:w-full rounded-full overflow-hidden border border-textPrimary">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full bg-transparent text-sm focus:outline-none text-gray-200 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-accent rounded-full p-2 m-1 flex items-center  justify-center text-white hover:bg-accent/90 transition"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>

      
      <hr className="border-gray-700 my-8" />
      <div className="text-left md:text-center text-xs text-gray-400">
        © {new Date().getFullYear()} RentCar. All rights reserved. | Designed by{" "}
        <span className="text-accent font-semibold">KASSAB Mohamed Amine</span>
      </div>
    </footer>
  );
};

export default Footer;
