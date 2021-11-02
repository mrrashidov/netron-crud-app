<template>
  <div v-if="this.isTagEdit">
    <div
      class="
        absolute
        top-0
        left-0
        w-full
        h-full
        overflow-hidden
        bg-gray-900 bg-opacity-80
      "
    >
      <div
        class="bg-white rounded shadow w-1/2 mx-auto transform translate-y-24"
      >
        <div class="text-right">
          <button
            class="
              hover:bg-gray-300
              rounded
              m-2
              text-gray-600
              hover:text-gray-800
            "
            @click="onCloseEditTask"
          >
            <CloseSvg />
          </button>
        </div>
        <div>
          <EditForm :todo="todo" :isTagEdit="this.isTagEdit" />
        </div>
      </div>
    </div>
    <div class="flex">
      <button @click="onDeleteTask(todo.id)" class="tick-button mt-3 mr-1">
        <TaskCheckBoxSvg class="tick" />
      </button>
      <div class="mt-2 ml-2 leading-5 w-full flex justify-between">
        <div>
          <p>{{ todo.title }}</p>
          <p class="text-gray-500 text-xs">{{ todo.description }}</p>
        </div>
        <div>
          <button @click="onEditTask"><EditTaskSvg /></button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex">
      <button @click="onDeleteTask(todo.id)" class="tick-button mt-3 mr-1">
        <TaskCheckBoxSvg class="tick" />
      </button>
      <div class="mt-2 ml-2 leading-5 w-full flex justify-between">
        <div>
          <p>{{ todo.title }}</p>
          <p class="text-gray-500 text-xs">{{ todo.description }}</p>
        </div>
        <div>
          <button @click="onEditTask"><EditTaskSvg /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from "./EditForm.vue";
import CloseSvg from "./icons/CloseSvg.vue";
import EditTaskSvg from "./icons/EditTaskSvg.vue";
import TaskCheckBoxSvg from "../components/icons/TaskCheckBoxSvg.vue";
import { useMutation } from "villus";
import { watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "Tasks",
  components: {
    TaskCheckBoxSvg,
    EditTaskSvg,
    CloseSvg,
    EditForm,
  },
  props: {
    todo: Object,
  },
  data() {
    return {
      isTagEdit: false,
    };
  },
  methods: {
    onEditTask() {
      this.isTagEdit = true;
    },
    onCloseEditTask() {
      this.isTagEdit = false;
    },
  },
  setup() {
    watchEffect(() => {});

    const store = useStore();

    const deleteTask = `
      mutation deleteTask($input: DeleteInput){
  deleteTask(input: $input){
    id
    user_id
    title
    description
    date
    status
    created_at
  }
}
      `;

    const { execute } = useMutation(deleteTask);

    function onDeleteTask(value) {
      console.log(value);
      execute({
        input: {
          id: value,
        },
      })
        .then((res) => {
          store.dispatch("DELETE_TASK", { id: value });
          console.log("id", value);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      onDeleteTask,
    };
  },
};
</script>

<style scoped>
.tick-button {
  height: 25px;
  width: 25px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.tick {
  display: none;
}

.tick-button:hover .tick {
  display: table-cell;
  vertical-align: middle;
}
</style>
