import React, { useState } from 'react'
import EastIcon from '@mui/icons-material/East';

const SearchBox = () => {
    const [formData,setFormData]=useState({
        pickupLocation:"",
        dropoffLocation:"",
        pickupDate:"",
        dropoffDate:""
    })
  return (
    <div className='relative -top-36  sm:-top-24 md:-top-28 lg:-top-14 xl:-top-10 2xl:-top-8 w-full max-w-[90%] mx-auto'>
        <div className=" bg-textPrimary rounded-2xl shadow-lg p-6 md:p-10">
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className='flex flex-col'>
                    <label className="text-sm font-medium text-gray-600">Pick-up Location</label>
                    <input placeholder='Search a location' className="px-4 mt-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" type="text" name="pickupLocation" value={formData.pickupLocation} onChange={(e)=>setFormData({...formData,pickupLocation:e.target.value})} />
                </div>
                <div className='flex flex-col'>
                    <label className="text-sm font-medium text-gray-600">Pick-up Date</label>
                    <input placeholder='19/03/2006' className="px-2 mt-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" type='date' name="pickupDate" value={formData.pickupDate} onChange={(e)=>setFormData({...formData,pickupDate:e.target.value})} />
                </div>
                <div className='flex flex-col'>
                    <label className="text-sm font-medium text-gray-600">Drop-off Location</label>
                    <input placeholder='Search a location' className="px-4 mt-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" type="text" name="dropoffLocation" value={formData.dropoffLocation} onChange={(e)=>setFormData({...formData,dropoffLocation:e.target.value})} />
                </div>
                <div className='flex flex-col'>
                    <label className="text-sm font-medium text-gray-600">Drop-off Date</label>
                    <input placeholder='19/03/2006' className="px-2 mt-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" type="date" name="dropoffDate" value={formData.dropoffDate} onChange={(e)=>setFormData({...formData,dropoffDate:e.target.value})} />
                </div>
                <div className='flex justify-center items-end'>
                    <button type="submit" className="w-full px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accentHover transition duration-300 shadow-md flex justify-center items-center gap-2">Find a Vehicule <EastIcon/> </button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default SearchBox