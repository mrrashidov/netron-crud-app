<template>
  <div
    class="w-full h-screen absolute top-0 left-0 bg-gray-900 bg-opacity-80"
    :style="{display: none}"
  >
    <div class="bg-white transform translate-y-24">Modal</div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    none: String,
  },
};
</script>

<style></style>
