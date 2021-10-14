<template>
  <template v-if="this.isLeftBarToggle == true">
    <div class="home flex">
      <div class="w-2/6">
        <div class="w-5/6 bg-gray-100">
          <ul>
            <li>Home</li>
            <li>Todos</li>
            <li>About</li>
            <li><InboxSvg />Inbox</li>
            <li><TodaySvg />Today</li>
            <li><UpComingSvg />Upcoming</li>
            <li>{{ this.isLeftBarToggle }}</li>
          </ul>
        </div>
      </div>
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
  </template>
  <template v-else>
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
  </template>
</template>

<script>
import AddTodo from "@/components/AddTodo.vue";
import InboxSvg from "../components/InboxSvg.vue";
import TodaySvg from "../components/TodaySvg.vue";
import UpComingSvg from "../components/UpComingSvg.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Home",
  components: {
    AddTodo,
    InboxSvg,
    TodaySvg,
    UpComingSvg,
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
