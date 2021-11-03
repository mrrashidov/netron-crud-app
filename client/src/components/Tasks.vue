<template>
  <div>
    <div>
      <div>
        <div
          class="flex justify-between items-center edit-task"
          v-if="isInput == true"
        >
          <div class="absolute w-1/2 mx-auto bg-white top-20 h-full">
            <div>
              <EditForm :todo="todo" :isTagEdit="this.isTagEdit" />
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
// import Task from "./Task.vue";
import EditForm from "./EditForm.vue";
import CloseSvg from "./icons/CloseSvg.vue";
import EditTaskSvg from "./icons/EditTaskSvg.vue";
import TaskCheckBoxSvg from "../components/icons/TaskCheckBoxSvg.vue";
import { useMutation, useSubscription } from "villus";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

import { useI18n } from "vue-i18n";
export default {
  name: "Tasks",
  components: {
    TaskCheckBoxSvg,
    EditTaskSvg,
    CloseSvg,
    EditForm,
    // Task,
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
    onCloseEditTask() {
      this.isTagEdit = false;
    },
  },
  setup() {
    const { t } = useI18n();
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

    // const newTask = `
    //   subscription {
    //     newTask{
    //         id
    //         title
    //         description
    //         date
    //         created_at
    //     }
    //     }
    //   `;

    // const { data } = useSubscription({ query: newTask });

    // watch(data, (incoming) => {
    //   messages.value.push(incoming);
    // });

    function onDeleteTask(value) {
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

    function onEditTask() {
      store.dispatch("GET_INPUT_TOGGLE", true);
    }

    const isInput = computed(() => store.state.setting.inputCancel);

    return {
      onDeleteTask,
      onEditTask,
      isInput,
      // messages,
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
