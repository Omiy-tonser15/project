import axios from "axios";

const api = axios.create({
  baseURL: "https://project-s1uc.onrender.com/api/", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
