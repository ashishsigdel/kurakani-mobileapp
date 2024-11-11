import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { router } from "expo-router";

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
  const accessToken = await AsyncStorage.getItem("accessToken");

  if (!accessToken) {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    router.push("/signin");
  }

  try {
    const response = await myAxios.post("/auth/refresh-token", {});

    const newAccessToken = response.data.data.accessToken;
    const user = response.data.data.user;

    if (!newAccessToken && !user) {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");
      router.push("/signin");
    }

    await AsyncStorage.setItem("accessToken", newAccessToken);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return newAccessToken;
  } catch (error) {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    router.push("/signin");
    return;
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
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return myAxios(originalRequest);
    }
    throw error;
  }
);

myAxios.interceptors.request.use(async (config) => {
  const storedToken = await AsyncStorage.getItem("accessToken");
  if (storedToken) {
    const decryptedToken = decryptAccessToken(storedToken);
    config.headers.Authorization = `Bearer ${decryptedToken}`;
  }
  return config;
});

export { myAxios, refreshAccessToken };

export { apiURL };
