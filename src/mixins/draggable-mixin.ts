import { mapActions } from "vuex";

export default {
  data() {
    return {
      draggable: false,
    };
  },
  methods: {
    ...mapActions({
      changeOrderLocations: "changeOrderLocations",
      setPreviousId: "setPreviousId",
    }),
    mouseDown(value: boolean) {
      this.draggable = value;
      this.setPreviousId(this.id);
    },
    dragEnd() {
      this.draggable = false;
    },
    dragOver(): void {
      this.changeOrderLocations(this.id);
    },
  },
};
