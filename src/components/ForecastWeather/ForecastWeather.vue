<template>
  <ul class="text-center" v-for="(item, index) in forecast" :key="index">
    <li class="text-4xl p-4">
      {{ getDateString(index, item[0].dt) }}
    </li>
    <li class="flex md:justify-center border-y overflow-x-auto">
      <ul class="mx-4" v-for="(day, index) in item" :key="index">
        <li class="text-center">{{ getTime(day.dt) }} uur</li>
        <li class="flex flex-col">
          <span class="text-center text-4xl"
            >{{ roundedValue(day.main.temp) }}°</span
          >
          <img :src="useIcons(day.weather[0].icon)" alt="icon" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { IForecastWeather, List } from "./IForecastWeather";
import { useIcons } from "@/util/useIcons";
import { roundedValue } from "@/util/helpers";
import { getForecast } from "@/util/apiClient";
import type { AxiosError } from "axios";
const forecast = ref<List[][]>();
const props = defineProps<{ coordinates?: { lat: string; lon: string } }>();
onMounted(async () => {
  const [error, forecastData] = (await getForecast(props.coordinates)) as [
    AxiosError,
    IForecastWeather
  ];
  if (error) {
    console.error(error);
    return;
  }
  forecast.value = groupedData(forecastData.list);
});
const groupedData = (list: List[]) =>
  list.reduce((prev: any, current, i) => {
    if (
      i > 0 &&
      new Date(prev[prev.length - 1][0].dt * 1000).toDateString() ===
        new Date(current.dt * 1000).toDateString()
    ) {
      prev[prev.length - 1] = [...prev[prev.length - 1], current];
    } else {
      prev[prev.length] = [current];
    }
    return prev;
  }, []);

const getDateString = (index: number, item: number) =>
  index === 0 ? "Vandaag" : new Date(item * 1000).toLocaleDateString();
const getTime = (item: number) => new Date(item * 1000).getHours();
</script>
