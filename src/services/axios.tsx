
import axios, { AxiosError, AxiosResponse } from "axios";
import { dispatchEvent } from "@hooks/useEvent";

const API_URL = process.env.REACT_APP_API_URL;
const getAccessToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return `Bearer ${token}`;
};

export const customAxios = (contentType: string) => {
  const accessToken = getAccessToken();
  const config = {
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: accessToken,
    },
  };

  const instance = axios.create(config);
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Logout user here
          console.log('User logged out due to 401 error');
          dispatchEvent({ eventName: "logout", payload: null })
        }
        return Promise.reject(error);
      },
    );

  return instance;
};

export const coreAxios = (contentType: string) => {
  const config = {
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType || "application/json",
    },
  };

  const instance = axios.create(config);

  return instance;
};
