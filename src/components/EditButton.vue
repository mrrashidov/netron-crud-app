<template>
  <div>
    <button
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
      :style="{ background: color, border: brColor, color: textColor }"
    >
      <i :class="icon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "EditButton",
  props: {
    icon: String,
    color: String,
    brColor: String,
    textColor: String,
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
