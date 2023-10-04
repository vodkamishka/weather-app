<template>
  <div>Add location</div>
  <div class="add-location">
    <input
      v-model="search"
      type="text"
      @keydown.enter="keyDown"
      class="add-location__input"
    />
    <button
      class="add-location__button"
      @click="onClick"
      :disabled="Boolean(!search.length)"
    >
      <ArrowSvg />
    </button>
  </div>
</template>

<script>
import ArrowSvg from "@/assets/icons/arrow-svg.vue";
import { mapActions } from "vuex";

export default {
  name: "AddLocation",
  data() {
    return {
      search: "",
    };
  },
  components: {
    ArrowSvg,
  },
  methods: {
    ...mapActions({
      addCity: "addCity",
    }),
    keyDown() {
      this.addCity(this.search);
      this.search = "";
    },
    onClick() {
      this.addCity(this.search);
      this.search = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.add-location {
  display: flex;
  gap: 5px;
  align-items: center;

  &__input {
    flex: 1;
    padding: 10px;
  }

  &__button {
    border: none;
    background: transparent;
  }
}
</style>
