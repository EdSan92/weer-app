<template>
  <div class="bg-blue-300 text-white pt-4 overflow-auto">
    <h1 class="text-center text-6xl md:text-8xl" v-if="weatherData">
      {{ weatherData.data.name }}
    </h1>
    <div class="flex flex-col items-center">
      <div class="mt-8 pt-4 p-12 rounded-full">
        <CurrentWeather
          v-if="currentLocation"
          :coordinates="currentLocation"
        ></CurrentWeather>
      </div>
    </div>

    <ForecastWeather
      v-if="currentLocation"
      :coordinates="currentLocation"
    ></ForecastWeather>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.vue";
import ForecastWeather from "./components/ForecastWeather/ForecastWeather.vue";
const weatherData = ref();
const currentLocation = ref();
onMounted(async () => {
  navigator.geolocation.getCurrentPosition(
    setCurrentLocation,
    setDefaultLocation
  );
});
const setCurrentLocation = (position: {
  coords: { latitude: number; longitude: number };
}) => {
  currentLocation.value = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  fetchData(currentLocation.value);
};
const setDefaultLocation = () => {
  const defaultLocation = { lat: 53.2190652, lon: 6.5680077 };
  currentLocation.value = defaultLocation;
  fetchData(defaultLocation);
};
const fetchData = async (location: { lat: number; lon: number }) => {
  try {
    weatherData.value = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&lang=nl&units=metric&appid=6a4ee0163b33f226ca20bb2b1a52c9ed`
    );
  } catch (error) {
    console.log(error);
  }
};
</script>
