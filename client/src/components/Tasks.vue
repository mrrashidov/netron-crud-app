<template>
  <div class="flex">
    <button @click="onDeleteTask(todo.id)" class="tick-button mt-3 mr-1">
      <TaskCheckBoxSvg class="tick" />
    </button>
    <div class="mt-2 ml-2 leading-5">
      <p>{{ todo.title }}</p>
      <p class="text-gray-500 text-xs">{{ todo.description }}</p>
    </div>
  </div>
</template>

<script>
import TaskCheckBoxSvg from "../components/icons/TaskCheckBoxSvg.vue";
import { useMutation } from "villus";
export default {
  name: "Tasks",
  components: {
    TaskCheckBoxSvg,
  },
  props: {
    todo: Object,
  },
  setup() {
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
          console.log(res);
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
