<template>
  <!-- Edit Page -->
  <div class="todo-list">
    <table class="w-4/6 mt-5 mx-auto text-center">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-2 text-xs text-gray-500">#</th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.name") }}
          </th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.description") }}
          </th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.price") }}
          </th>
          <th class="px-6 py-2 text-xs text-gray-500">Select</th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.status") }}
          </th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.taskUpdate") }}
          </th>
          <th class="px-6 py-2 text-xs text-gray-500">
            {{ $t("message.taskDelete") }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white" v-for="(todo, index) in todos" :key="index">
        <Todo :todo="todo" />
      </tbody>
    </table>
    <div v-for="(todo, index) in todos" :key="index">
      <Modal :todo="todo" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Todo from "@/components/Todo.vue";
import Modal from "../components/Modal.vue";
export default {
  name: "Todos",
  components: {
    Todo,
    Modal,
  },
  setup() {
    const store = useStore();
    store.dispatch("GET_TODOS");
    const todos = computed(() => store.state.todo.todos);
    return {
      todos,
    };
  },
};
</script>
