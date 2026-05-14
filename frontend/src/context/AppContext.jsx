import React from 'react'
import { createContext,useState,useContext,useEffect } from 'react'
import { useNavigate } from "react-router";

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const currency = '$';
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(null);
    const navigate=useNavigate();


    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])




  return (
    <AppContext.Provider value={{user,setUser,token,setToken,currency,backendUrl,navigate}}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);

