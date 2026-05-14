import React, { useState } from 'react'
import {assets} from "../assets/assets.js"
import {NavLink, Link } from 'react-router'
import LanguageIcon from '@mui/icons-material/Language';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { token,setToken,setUser } =useAppContext();
  const [visible,setVisible]=useState(false)
  const [menuOpen,setMenuOpen]=useState(false)
  

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setMenuOpen(false)
    
  }


  return (
    <div className=' flex justify-between items-center py-7 px-5 font-medium'>
      <Link  to={'/'}><img src={assets.logo} className=' w-32' alt='' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-textPrimary px-6 py-3 rounded-full bg-gradient-to-r  from-[#900C3F]/60 to-[#e0e0e070]/40 backdrop-blur-sm '>
        <NavLink to='/' className={'flex items-center'}>
          <p>HOME</p>
          
        </NavLink>
        <NavLink to='/cars' className={'flex items-center'}>
          <p>CARS</p>
        </NavLink>
        <NavLink to='/about' className={'flex items-center '}>
          <p>ABOUT</p>
          

        </NavLink>
        <NavLink to='/contact' className={'flex items-center'}>
          <p>CONTACT</p>
                

        </NavLink>
        { !token ?(<Link to="/find-reservation" className='flex items-center gap-1 '>
          <DirectionsCarIcon className='hidden lg:inline'/>
          <p className='hidden lg:block'>Manage my reservations</p>
        </Link>):
          <Link to="/my-reservations" className='flex items-center gap-1 '>
          <DirectionsCarIcon className='hidden lg:inline' />
          <p className='hidden lg:block'>MANAGE MY RESERVATIONS</p>
        </Link>
        }
        
      </ul>
      <div className="flex items-center gap-2 text-textPrimary">
        
        
        

        <div   className="px-2 sm:px-4 py-2 rounded-full  flex gap-2 text-textPrimary   transition duration-300">
          <LanguageIcon  />
          <p className='hidden lg:block'><span className='hover:text-accent cursor-pointer'>EN</span> | <span className='hover:text-accent cursor-pointer'>$</span></p>
        </div>

        {!token ? (
          <Link to="/login" className="px-4  py-2 rounded-full bg-accent text-textPrimary   hover:bg-accentHover shadow-md transition duration-300 text-center">Sign Up</Link>
        
        ):(
          <div className='relative'>
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white hover:bg-accentHover">
              <AccountCircleIcon className='cursor-pointer' fontSize="medium" />
            </button>
            {menuOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-textPrimary shadow-lg z-50 rounded-xl py-2'>
                <Link to="/profile" onClick={()=>setMenuOpen(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 '>Profile</Link>
                <Link to="/my-reservations" onClick={()=>setMenuOpen(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 '>My Reservations</Link>
                <Link to="/help" onClick={()=>setMenuOpen(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 '>Help</Link>
                <button onClick={handleLogout} className='block cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'>Logout</button>

              </div>
            )}
          </div>

        )}


        <MenuRoundedIcon
          onClick={() => setVisible(true)}
          className="cursor-pointer   sm:!hidden"
        />
        
        
      </div>

      <div className={` fixed w-full top-0 right-0  overflow-hidden bottom-0 bg-accent transition-transform duration-500 ease-in-out ${visible ? 'translate-x-0  ' : 'translate-x-full '} z-50 sm:hidden`}>
        
        <div className="flex items-center justify-center py-6 border-b border-white/20">
          <Link to={'/'}>
            <img src={assets.logo} className="w-32 hover:scale-105 transition-transform duration-300" alt="Logo" />
          </Link>
        </div>

        
        <div className="flex flex-col items-center gap-6 py-10 text-white text-lg font-semibold tracking-wide">
          <NavLink 
            onClick={()=>setVisible(false)}  
            className="hover:text-yellow-300 transition-colors duration-300" 
            to='/'
          >
            HOME
          </NavLink>

          <NavLink 
            onClick={()=>setVisible(false)}  
            className="hover:text-yellow-300 transition-colors duration-300" 
            to='/cars'
          >
            CARS
          </NavLink>

          <NavLink 
            onClick={()=>setVisible(false)}  
            className="hover:text-yellow-300 transition-colors duration-300" 
            to='/about'
          >
            ABOUT
          </NavLink>

          <NavLink 
            onClick={()=>setVisible(false)}  
            className="hover:text-yellow-300 transition-colors duration-300" 
            to='/contact'
          >
            CONTACT
          </NavLink>

          {token ?(<NavLink 
            onClick={()=>setVisible(false)}  
            className="hover:text-yellow-300 transition-colors duration-300" 
            to='/my-reservations'
          >
            MANAGE MY RESERVATIONS
          </NavLink>):(
            <NavLink 
              onClick={()=>setVisible(false)}  
              className="hover:text-yellow-300 transition-colors duration-300" 
              to='/find-reservation'
            >
              MANAGE MY RESERVATIONS
            </NavLink>

          )}
        </div>

        
        <div 
          onClick={()=>setVisible(false)} 
          className="flex items-center justify-center gap-3 mt-12 text-white cursor-pointer hover:text-accentHover transition-colors duration-300"
        >
          <ArrowDropDownCircleOutlinedIcon className="rotate-90 text-2xl" />
          <p className="uppercase tracking-wider">Back</p>
        </div>
      </div>

    </div>
  )
}

export default Navbar