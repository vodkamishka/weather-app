<template>
  <div class="weather-app">
    <div class="weather-app__gear">
      <GearSvg v-if="!showEditPage" @click="switchPages" />
    </div>
    <weather-page v-if="!showEditPage"></weather-page>
    <edit-page v-else :switchPages="switchPages"></edit-page>
  </div>
</template>

<script>
import WeatherPage from "@/pages/weather-page";
import EditPage from "@/pages/edit-page";
import GearSvg from "@/assets/icons/gear-svg.vue";

import "./styles/index.scss";

export default {
  data() {
    return {
      showEditPage: false,
    };
  },
  components: {
    WeatherPage,
    EditPage,
    GearSvg,
  },
  methods: {
    switchPages() {
      this.showEditPage = !this.showEditPage;
    },
  },
};
</script>

<style scoped>
.weather-app {
  width: 300px;
  margin-top: 50px;
}
.weather-app__gear {
  display: flex;
  justify-content: flex-end;
}
</style>
