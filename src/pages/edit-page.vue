<template>
  <div class="edit-page__title">
    Settings
    <CrossSvg @click="switchPages" />
  </div>
  <location-settings
    v-for="location in data"
    :name="location.location"
    :key="location.id"
    :id="location.id"
  ></location-settings>
  <div class="widget__add-location">
    <add-location></add-location>
  </div>
</template>

<script lang="ts">
import LocationSettings from "@/components/UI/location-settings.vue";
import AddLocation from "@/components/UI/add-location.vue";
import CrossSvg from "@/assets/icons/cross-svg.vue";
import { mapState } from "vuex";

export default {
  components: { LocationSettings, AddLocation, CrossSvg },
  props: {
    switchPages: Function,
  },
  computed: {
    ...mapState({
      data: "data",
    }),
  },
};
</script>

<style scoped>
.edit-page__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.widget__add-location {
  margin-top: 30px;
}
</style>
