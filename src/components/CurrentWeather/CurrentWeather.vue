<template>
  <div class="flex flex-col items-center" v-if="props.weatherData">
    <span class="text-4xl">
      {{
        capitalizeFirstLetter(props.weatherData.weather[0].description)
      }}</span
    >
    <span class="text-white text-6xl"
      >{{ roundedValue(props.weatherData.main.temp) }}°</span
    >
    <img :src="useIcons(props.weatherData.weather[0].icon)" alt="icon" />
  </div>
</template>

<script setup lang="ts">
import type { ICurrentWeather } from "./ICurrentWeather";
import { useIcons } from "@/util/useIcons";
import { capitalizeFirstLetter, roundedValue } from "@/util/helpers";
const props = defineProps<{ weatherData: ICurrentWeather }>();
</script>
