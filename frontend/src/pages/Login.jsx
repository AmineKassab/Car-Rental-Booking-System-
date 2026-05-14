import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const { token, setToken, setUser, backendUrl, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [currentState, setCurrentState] = useState("Sign Up");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        currentState === "Sign Up"
          ? "/api/v1/user/register"
          : "/api/v1/user/login";

      const { data } = await axios.post(`${backendUrl}${endpoint}`, {
        name: currentState === "Sign Up" ? name : undefined,
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      setToast({
        open: true,
        message: "Authentication successful 🚀",
        severity: "success",
      });
    } catch (error) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || "Authentication failed. Try again.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen py-24 lg:py-0 flex items-center justify-center bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C2C2C] via-[#1A1A1A] to-black"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#444] to-transparent blur-3xl opacity-30"></div>

      <div className="relative mt-20 lg:mt-0 z-10 w-[85%]  max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl  grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-4 right-4 bg-white/70 hover:bg-white px-3 py-1 rounded-full shadow">
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <ArrowBackRoundedIcon className="mr-1" />
              Back to home
            </Link>
          </div>
          <div className="absolute top-4 left-4  px-3 py-1 ">
            <img src={assets.logo} className=' w-32' alt="" />
          </div>
          <img
            src={assets.loginPhoto2}
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute lg:hidden -top-16 left-1 bg-white/70 hover:bg-white px-3 py-1 rounded-full shadow">
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <ArrowBackRoundedIcon className="mr-1" />
              Back to home
            </Link>
        </div>
        <div className="absolute lg:hidden z-50  -top-40 sm:-top-36 left-1/2 transform -translate-x-1/2">
          <img src={assets.logo} className="w-44" alt="Logo" />
        </div>



        <div className="px-6 sm:px-10 py-8 sm:py-12 lg:px-16 flex flex-col justify-center">
          
          <h1 className="font-bold mb-4 text-2xl sm:text-3xl lg:text-4xl text-gray-800">
            {currentState === "Sign Up"
              ? "Create your account"
              : "Sign in to your account"}
          </h1>

          {currentState === "Sign Up" ? (
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer text-accent font-medium"
                onClick={() => setCurrentState("Login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              Don’t have an account?{" "}
              <span
                className="underline cursor-pointer text-accent font-medium"
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {currentState === "Sign Up" && (
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                required
              />
            </div>

            {currentState === "Sign Up" && (
              <p className="text-xs text-gray-500">
                By signing up, you agree to our{" "}
                <span className="text-accent cursor-pointer">Terms</span> &{" "}
                <span className="text-accent cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-accent text-white cursor-pointer px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base flex items-center justify-center font-medium shadow hover:bg-accent/90 transition"
            >
              <span className="mr-2">
                {currentState === "Sign Up" ? "Sign Up" : "Login"}
              </span>
              <ArrowForwardIosIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseToast}
          severity={toast.severity}
          elevation={6}
          variant="filled"
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
