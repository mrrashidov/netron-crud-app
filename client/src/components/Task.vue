<template>
  <div>
    <div v-for="(task, index) in messages" :key="index">
      <hr class="mt-2" />
      <div>
        <div>
          <div
            class="flex justify-between items-center edit-task"
            v-if="isInput == true"
          >
            <div class="absolute w-1/2 mx-auto bg-white top-20 h-full">
              <div>
                <EditForm />
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
                  <button
                    @click="onDeleteTask(task.newTask.id)"
                    class="task-tick-svg"
                  >
                    <TaskCheckBoxSvg />
                  </button>
                </div>
              </div>
              <div class="ml-2">
                <p>{{ task.newTask.title }}</p>
                <p class="text-gray-600 text-sm">
                  {{ task.newTask.description }}
                </p>
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
  </div>
</template>

<script>
import EditForm from "./EditForm.vue";
import TaskCheckBoxSvg from "./icons/TaskCheckBoxSvg.vue";
import EditTaskSvg from "./icons/EditTaskSvg.vue";
import { watch, ref, computed } from "vue";
import { useSubscription } from "villus";
import { useStore } from "vuex";
export default {
  name: "Task",
  components: {
    EditTaskSvg,
    TaskCheckBoxSvg,
    EditForm,
  },
  setup() {
    const store = useStore();
    const newTask = `
       subscription {
         newTask{
            id
            title
           description
            date
           created_at
         }
       }
      `;

    const delTask = `
       subscription {
         delTask
       }
      `;

    const messages = ref([]);
    const { data: addTaskData } = useSubscription({ query: newTask });
    const { data: delTaskData } = useSubscription({ query: delTask });

    watch([addTaskData, delTaskData], (incoming) => {
      const newTask = incoming[0];
      const delTask = incoming[1];

      if (newTask) {
        messages.value.push(newTask);
      }
      if (delTask) {
        const delMessage = messages.value.filter(
          (message) => message.id !== delTask.delTask
        );
        console.log("delMessage", delMessage);
        // messages.value.push(delMessage);
        console.log("m", messages.value);
        console.log("asgdjasdjads", delTask.delTask);
      }
    });

    // function onDeleteTask() {}

    const isInput = computed(() => store.state.setting.inputCancel);

    return {
      messages,
      isInput,
    };
  },
};
</script>
