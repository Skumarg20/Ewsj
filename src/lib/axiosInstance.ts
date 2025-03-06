import axios from "axios";
import { triggerUpgradePopup } from "@/context/UpgradeContext";
import { getAuthHeader } from "@/lib/api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000, 
});



axiosInstance.interceptors.request.use(
  (config) => {
    const authHeader = getAuthHeader();
    config.headers = config.headers || {};
    if (authHeader) {
      Object.assign(config.headers, authHeader);
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error("Unauthorized: Please log in again.");
          break;
        case 403:
          console.error("Forbidden: Access denied.");
          break;
        case 404:
          console.error("Not Found: Requested resource is unavailable.");
          break;
        case 429:
          triggerUpgradePopup();
          console.warn("Too Many Requests: Rate limit exceeded.");
          break;
        case 500:
          console.error("Internal Server Error: Try again later.");
          break;
        case 503:
          console.error("Service Unavailable: The server is temporarily down.");
          break;
        default:
          console.error(`Unexpected Error (${status}):`, error.response.data);
      }
    } else if (error.request) {
      console.error("Network Error: No response from server.", error.message);
    } else {
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;