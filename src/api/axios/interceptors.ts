import { api } from "./client";

export const setupInterceptors = () => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("dc_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("Unauthorized - Token expired");
        localStorage.removeItem("dc_token");
        localStorage.removeItem("dc_user");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};
