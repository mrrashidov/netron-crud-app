<template>
  <div v-if="this.isLeftBarToggle == true">
    <div class="home flex">
      <Leftbar />
      <div class="w-full card">
        <div
          class="
            flex
            bg-white
            shadow-md
            border border-gray-200
            rounded-lg
            w-4/6
            mt-5
          "
        >
          <AddTodo />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="home flex">
      <div class="w-full card">
        <div
          class="
            flex
            bg-white
            shadow-md
            border border-gray-200
            rounded-lg
            w-4/6
            mt-5
            mx-auto
          "
        >
          <AddTodo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo.vue";
import Leftbar from "@/components/Leftbar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Home",
  components: {
    AddTodo,
    Leftbar,
  },
  setup() {
    const store = useStore();
    store.dispatch("GET_LEFTBAR_TOGGLE", false);
    const isLeftBarToggle = computed(() => store.state.todo.leftBarToggle);
    return {
      isLeftBarToggle,
    };
  },
};
</script>
