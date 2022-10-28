import type { ICurrentWeather } from "@/components/CurrentWeather/ICurrentWeather";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const getWeather = async (coordinates: any) => {
  try {
    if (coordinates) {
      const { data } = await apiClient.get<ICurrentWeather>(
        `/weather?lat=${coordinates.lat}&lon=${
          coordinates.lon
        }&lang=nl&units=metric&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`
      );
      return [null, data];
    }
  } catch (error) {
    return [error];
  }
};

export const getForecast = async (coordinates: any) => {
  try {
    if (coordinates) {
      const { data } = await apiClient.get<ICurrentWeather>(
        `/forecast?lat=${coordinates.lat}&lon=${
          coordinates.lon
        }&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      return [null, data];
    }
  } catch (error) {
    return [error];
  }
};
