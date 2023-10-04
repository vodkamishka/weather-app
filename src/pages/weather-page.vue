<template>
  <location-weather
    v-for="(dataCity, i) in data"
    :dataCity="dataCity"
    :key="i"
  ></location-weather>
</template>

<script>
import LocationWeather from "../components/location-weather";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    LocationWeather,
  },
  computed: {
    ...mapState({
      data: "data",
    }),
  },
  methods: {
    ...mapActions({
      getLocations: "getLocations",
    }),
  },
  mounted() {
    this.getLocations();
  },
};
</script>

<style scoped></style>
