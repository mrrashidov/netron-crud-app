<template>
  <div>
    <button
      @click="onDelete"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      <DeleteSvg />
    </button>
  </div>
</template>

<script>
import DeleteSvg from "@/components/DeleteSvg.vue";
export default {
  name: "DeleteButton",
  props: {
    id: Number,
  },
  components: {
    DeleteSvg,
  },
  methods: {
    onDelete() {
      this.$store.dispatch("DELETE_TODO", this.id);
    },
  },
};
</script>
