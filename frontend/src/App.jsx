import { Routes, Route, useLocation } from "react-router";
import Cars from "./pages/Cars";
import About from "./pages/About";
import Home from "./pages/Home";   
import Contact from "./pages/Contact";
import CarDetail from "./pages/CarDetail";
import ReservationStep1 from "./pages/ReservationStep1";
import ReservationStep2 from "./pages/ReservationStep2";
import ReservationStep3 from "./pages/ReservationStep3";
import ReservationFormPage from "./pages/ReservationFormPage";
import MyReservations from "./pages/MyReservations";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar"
import Help from "./pages/Help"
import FindReservation from "./pages/FindReservation"
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  const location=useLocation()

  return (
    <>


      
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/cars/:id" element={<CarDetail/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation/step1" element={<ReservationStep1 />} />
        <Route path="/reservation/step2" element={<ReservationStep2 />} />
        <Route path="/reservation/step3" element={<ReservationStep3 />} />
        <Route path="/reservation/form" element={<ReservationFormPage />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/find-reservation" element={<FindReservation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {location.pathname !== "/login" && <Footer/>}
    </>
    
  )
}

export default App
