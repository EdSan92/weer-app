<template>
  <div class="flex flex-col items-center" v-if="weatherData">
    <span class="text-4xl">
      {{ capitalizeFirstLetter(weatherData.weather[0].description) }}</span
    >
    <span class="text-white text-6xl"
      >{{ roundedValue(weatherData.main.temp) }}°</span
    >
    <img :src="useIcons(weatherData.weather[0].icon)" alt="icon" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ICurrentWeather } from "./ICurrentWeather";
import { useIcons } from "@/util/useIcons";
import { capitalizeFirstLetter, roundedValue } from "@/util/helpers";
import { getWeather } from "@/util/apiClient";
import type { AxiosError } from "axios";
const weatherData = ref<ICurrentWeather | undefined>();
const props = defineProps<{ coordinates?: { lat: string; lon: string } }>();
onMounted(async () => {
  const [error, currentWeather] = (await getWeather(props.coordinates)) as [
    AxiosError,
    ICurrentWeather
  ];
  if (error) {
    console.error(error);
    return;
  }
  weatherData.value = currentWeather;
});
</script>
