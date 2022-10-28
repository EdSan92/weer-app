import type { ICurrentWeather } from "@/components/CurrentWeather/ICurrentWeather";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const getWeather = async (coordinates: any) => {
  try {
    if (coordinates) {
      const { data } = await apiClient.get<ICurrentWeather>(
        `/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=nl&units=metric&appid=6a4ee0163b33f226ca20bb2b1a52c9ed`
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
        `/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=6a4ee0163b33f226ca20bb2b1a52c9ed`
      );
      return [null, data];
    }
  } catch (error) {
    return [error];
  }
};
