<template>
  <div class="home">
    <div class="card">
      <div
        class="
          flex
          mx-auto
          bg-white
          shadow-md
          border border-gray-200
          rounded-lg
          max-w-lg
          mt-5
        "
      >
        <AddTodo />
      </div>
    </div>
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo.vue";
export default {
  name: "Home",
  components: {
    AddTodo,
  },
};
</script>
