<template>
  <div class="location-weather-wrapper">
    <div :class="b()">
      <div :class="b('header')">
        <div :class="b('place')">
          <div>{{ dataCity.location }},</div>
          <div>{{ dataCity.country }}</div>
        </div>
      </div>
      <div :class="b('image-temperature')">
        <img
          :src="`https://openweathermap.org/img/wn/${dataCity.icon}.png`"
          alt="picture weather"
        />
        <div :class="b('temperature')">{{ dataCity.temperature }}°C</div>
      </div>
      <div :class="b('description')">
        Feels like {{ dataCity.feelsLike }}°C. {{ description }}.
      </div>
      <div :class="b('wind-pressure')">
        <div :class="b('wind')">
          <div :class="b('plane')">
            <PlaneSvg />
          </div>
          {{ dataCity.speed }} m/s.
        </div>
        <div :class="b('pressure')">
          <div :class="b('plane')">
            <PressureSvg />
          </div>
          {{ dataCity.pressure }} hPa.
        </div>
      </div>
      <div :class="b('humidity')">Humidity: {{ dataCity.humidity }}%</div>
      <div :class="b('visibility')">Visibility: {{ getKilometers }}.0 km</div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { b } from "@/helpers/classnames";
import { convertMetersToKilometers } from "@/helpers/convertMetersToKilometers";
import { IWeatherLocation } from "@/services/api/types/model";
import capitalize from "lodash/capitalize";
import PlaneSvg from "@/assets/icons/plane-svg.vue";
import PressureSvg from "@/assets/icons/pressure-svg.vue";

export default {
  data() {
    return {
      b: b("location-weather"),
      description: capitalize(this.dataCity.description),
    };
  },
  props: {
    dataCity: Object as PropType<IWeatherLocation>,
  },
  components: {
    PlaneSvg,
    PressureSvg,
  },
  computed: {
    getKilometers(): number {
      return convertMetersToKilometers(this.dataCity.visibility);
    },
  },
};
</script>

<style lang="scss" scoped>
.location-weather-wrapper {
  margin: 10px;
}
.location-weather {
  width: 100%;
  border-radius: 20px;
  padding: 40px;
  background: var(--linear-gradient);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  &__header {
    display: flex;
    align-items: center;
  }
  &__place {
    display: flex;
    gap: 10px;
    font-size: 20px;
    line-height: 22px;
  }
  &__image-temperature {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 25px;
    line-height: 27px;
  }
  &__wind-pressure {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  &__wind {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  &__pressure {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  &__plane {
    width: 15px;
    height: 15px;

    & .svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
