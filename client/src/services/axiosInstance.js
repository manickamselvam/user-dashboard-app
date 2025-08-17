import axios from "axios";
import { API_BASE_URL, API_KEY } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export default axiosInstance;
