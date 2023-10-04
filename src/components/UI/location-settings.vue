<template>
  <div :class="b()" :draggable="draggable" @dragend="dragEnd">
    <div :class="b('burger')">
      <BurgerSvg @mousedown="mouseDown(true)" @dragover="dragOver" />
      {{ name }}
    </div>
    <TrashSvg @click="deleteItem(name)" />
  </div>
</template>

<script lang="ts">
import { b } from "../../helpers/classnames";
import BurgerSvg from "@/assets/icons/burger-svg.vue";
import TrashSvg from "@/assets/icons/trash-svg.vue";
import DraggableMixin from "@/mixins/draggable-mixin";
import { mapActions } from "vuex";

export default {
  name: "LocationSettings",
  components: {
    BurgerSvg,
    TrashSvg,
  },
  mixins: [DraggableMixin],
  data() {
    return {
      b: b("location-settings"),
    };
  },
  props: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  methods: {
    ...mapActions({
      deleteItem: "deleteItem",
    }),
  },
};
</script>

<style lang="scss" scoped>
.location-settings {
  background: var(--light-grey);
  margin: 5px 0;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;

  &__burger {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
