import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();
  const { clearTokens, setTokens, tokens } = useAuthStore();
  const refreshToken = async () => {
    try {
      if (tokens) {
        const response = await axiosInstance.post("/token/refresh/", {
          refresh: tokens?.refreshToken,
        });
        if (response.status === 200) {
          setTokens({ ...tokens, accessToken: response.data.access });
        }
      }
    } catch (error) {
      console.log("[REFRESH TOKEN] = catch ", error);
    }
  };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      if (tokens?.accessToken) {
        request.headers.Authorization = `Bearer ${tokens?.accessToken}`;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url.includes("/token/refresh/")
      ) {
        clearTokens();
        navigate("/login");
        return Promise.reject(error);
      } else if (
        error.response.status === 401 &&
        error.response.data.code === "token_not_valid" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        await refreshToken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );
  return axiosInstance;
};

export default useAxios;
