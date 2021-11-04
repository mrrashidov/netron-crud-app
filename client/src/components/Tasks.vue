<template>
  <div>
    <div>
      <div>
        <div class="flex justify-between items-center edit-task" v-if="isInput">
          <div class="absolute w-1/2 mx-auto bg-white top-20 h-full">
            <div>
              <EditForm :todo="todo" :isTagEdit="isTagEdit" />
            </div>
          </div>
        </div>
        <div v-else class="flex justify-between items-center edit-task">
          <div class="flex justify-between items-center">
            <div
              class="
                rounded-full
                h-5
                w-5
                flex
                items-center
                justify-center
                border border-gray-400
                task-tick-checkbox
              "
            >
              <div>
                <button @click="onDeleteTask(todo.id)" class="task-tick-svg">
                  <TaskCheckBoxSvg />
                </button>
              </div>
            </div>
            <div class="ml-2">
              <p>{{ todo.title }}</p>
              <p class="text-gray-600 text-sm">{{ todo.description }}</p>
            </div>
          </div>
          <div>
            <button @click="onEditTask" class="edit-task-button">
              <EditTaskSvg class="edit-task-svg" />
            </button>
          </div>
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
  import { useStore } from "vuex";
  import { computed, ref } from "vue";

  import { useI18n } from "vue-i18n";
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
    setup() {
      const { t } = useI18n();
      const store = useStore();
      const isTagEdit = ref(false);

      const deleteTask = `
      mutation deleteTask($id: ID!){
        deleteTask(id: $id)
      }
      `;
      const { execute } = useMutation(deleteTask);

      function onDeleteTask(value) {
        execute({
          id: value,
        })
          .then((res) => {
            store.dispatch("task/DELETE_TASK", { id: value });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function onEditTask() {
        store.dispatch("GET_INPUT_TOGGLE", true);
      }

      const isInput = computed(() => store.state.setting.inputCancel);

      return {
        onDeleteTask,
        onEditTask,
        isInput,
        isTagEdit,
        t,
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
