import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // comes from .env
  withCredentials: true,
});

// Cars
export const getAllCars = async () => {
  const res = await api.get("/api/v1/cars");
  return res.data;
};
