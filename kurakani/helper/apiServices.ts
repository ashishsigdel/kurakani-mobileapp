import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";
import { Linking } from "react-native";

const apiURL = "http://192.168.1.85:8000";
const baseUrl = `${apiURL}/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const encryptAccessToken = (accessToken: string) => {
  return accessToken;
};

const decryptAccessToken = (encryptedAccessToken: string) => {
  return encryptedAccessToken;
};

const refreshAccessToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem("accessToken");
    const accessToken = decryptAccessToken(storedToken || "");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await axios.post(
      `${apiURL}/api/auth/refresh-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    const newAccessToken: string = response.data.data.accessToken;
    const encryptedAccessToken: string = encryptAccessToken(newAccessToken);
    await AsyncStorage.setItem("accessToken", encryptedAccessToken);
    return newAccessToken;
  } catch (error: any) {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    router.push("/signin");
  }
};

myAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const byPassUrls = [
      "/auth/login",
      "/auth/refresh-token",
      "/auth/register",
      "/reset-password/change",
    ];
    function isBypassUrl(url: string): boolean {
      if (byPassUrls.includes(url)) return true;

      return false;
    }
    if (error.config && isBypassUrl(error.config.url)) throw error;
    if (error.response && error.response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `${newAccessToken}`;
      return myAxios(originalRequest);
    }
    throw error;
  }
);

myAxios.interceptors.request.use(async (config) => {
  const storedToken = await AsyncStorage.getItem("accessToken");
  if (storedToken) {
    const decryptedToken = decryptAccessToken(storedToken);
    config.headers.Authorization = `${decryptedToken}`;
  }
  return config;
});

export { myAxios };
