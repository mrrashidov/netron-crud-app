<template>
  <div>
    <button
      @click="onClick"
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
    >
      <EditSvg />
    </button>
  </div>
</template>

<script>
import EditSvg from "@/components/EditSvg.vue";
export default {
  name: "EditButton",
  components: {
    EditSvg,
  },
  methods: {
    onClick(event) {
      this.$store.dispatch("GET_TOGGLE", true);
    },
  },
};
</script>

<style scoped>
button {
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 0, 255, 0.9) !important;
}
</style>
