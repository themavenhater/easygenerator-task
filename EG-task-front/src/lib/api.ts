import axios from "axios";
import { BASE_URL } from "./constants";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 1 * 60 * 2000, // 1 minute
});

// api.interceptors.request.use((config: AxiosRequestConfig) => {
//   if (!config.headers?.authorization) {
//     const access_token = localStorage.getItem("access_token");
//     config.headers = {
//       ...config.headers,
//       authorization: access_token,
//     };
//     return config;
//   }
//   return config;
// });
