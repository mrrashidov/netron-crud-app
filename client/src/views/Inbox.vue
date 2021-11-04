<template>
  <div v-if="isToggleModal">
    <TagModal />
    <div class="flex" v-if="this.isLeftBarToggle == true">
      <LeftBar />
      <div class="w-full mt-5 p-4">
        <div class="w-1/2 mx-auto">
          <div class="w-full flex justify-between items-center">
            <div>
              <h1 class="text-xl font-bold">
                {{ t("inboxPage.headerTop") }}
              </h1>
            </div>
            <div>
              <button class="btn btn-comment mr-2">
                <CommentSvg />Yorumlar
              </button>
              <button class="btn btn-view mr-2"><ViewSvg />Görüntüle</button>
              <button class="btn btn-sort">
                <SortSvg />
                {{ t("inboxPage.sort") }}
              </button>
            </div>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <button class="tick-button mt-3 mr-1">
                  <TaskCheckBoxSvg class="tick" />
                </button>
                <div class="mt-2 ml-2 leading-5">
                  <p>{{ todo.title }}</p>
                  <p class="text-gray-500 text-xs">{{ todo.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-3" />
          <div v-if="this.isActive == false">
            <div>
              <button
                @click="onClick"
                class="add-task-button flex items-center mt-2"
              >
                <AddTaskSvg class="add-task-svg mt-1 mr-1" />
                <p class="add-task-text text-gray-500">
                  {{ t("inboxPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("inboxPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("inboxPage.text") }}
              </p>
              <div class="text-center">
                <button
                  @click="onClick"
                  class="
                    add-task-button-general
                    w-24
                    h-9
                    mt-2
                    bg-red-500
                    rounded
                    text-white
                  "
                >
                  {{ t("inboxPage.addTask") }}
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <Form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <Field
                      type="text"
                      name="form"
                      v-model="form"
                      :rules="formRules"
                      class="w-full outline-none pl-3"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      v-model="description"
                      :rules="descriptionRules"
                      class="
                        w-full
                        h-auto
                        outline-none
                        mt-2
                        pl-3
                        resize-none
                        overflow-y-hidden
                      "
                      placeholder="Açıklama"
                    ></Field>
                    <div class="ml-3 mr-3">
                      <label class="text-red-500">
                        <ErrorMessage name="description" />
                      </label>
                      <label class="text-red-500">
                        <ErrorMessage name="form" />
                      </label>
                      <label class="text-red-500">
                        <ErrorMessage name="date" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <Field
                      name="date"
                      v-model="date"
                      :rules="dateRules"
                      :format="dd - MM - YYYY"
                      type="date"
                      class="
                        h-auto
                        outline-none
                        ml-2
                        mt-2
                        mb-2
                        pl-3
                        border border-gray-300
                        rounded
                      "
                    />
                    <select
                      as="select"
                      name="group"
                      v-model="group"
                      class="
                        h-auto
                        outline-none
                        ml-2
                        mt-2
                        mb-2
                        pl-3
                        border border-gray-300
                        rounded
                      "
                    >
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div>
                    <button
                      type="submit"
                      class="btn btn-primary bg-primary mr-2"
                    >
                      {{ t("todayPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="btn btn-cancel"
                    >
                      {{ t("inboxPage.cancel") }}
                    </button>
                  </div>
                  <div>
                    <template v-if="this.description">
                      <p>{{ this.description.length }}</p>
                    </template>
                    <template v-else>
                      <p>0</p>
                    </template>
                  </div>
                </div>
                <div class="mt-2">
                  <!-- <p class="text-red-500">{{ titleError }}</p>
                <p class="text-red-500">{{ descriptionError }}</p> -->
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mt-5 p-4">
        <div class="w-1/2 mx-auto">
          <div class="w-full flex justify-between items-center">
            <div>
              <h1 class="text-xl font-bold">
                {{ t("inboxPage.headerTop") }}
              </h1>
            </div>
            <div>
              <button class="btn btn-comment mr-2">
                <CommentSvg />Yorumlar
              </button>
              <button class="btn btn-view mr-2"><ViewSvg />Görüntüle</button>
              <button class="btn btn-sort">
                <SortSvg />
                {{ t("inboxPage.sort") }}
              </button>
            </div>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <button class="tick-button mt-3 mr-1">
                  <TaskCheckBoxSvg class="tick" />
                </button>
                <div class="mt-2 ml-2 leading-5">
                  <p>{{ todo.title }}</p>
                  <p class="text-gray-500 text-xs">{{ todo.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-3" />
          <div v-if="this.isActive == false">
            <div>
              <button
                @click="onClick"
                class="add-task-button flex items-center mt-2"
              >
                <AddTaskSvg class="add-task-svg mt-1 mr-1" />
                <p class="add-task-text text-gray-500">
                  {{ t("inboxPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("inboxPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("inboxPage.text") }}
              </p>
              <div class="text-center">
                <button
                  @click="onClick"
                  class="
                    add-task-button-general
                    w-24
                    h-9
                    mt-2
                    bg-red-500
                    rounded
                    text-white
                  "
                >
                  {{ t("inboxPage.addTask") }}
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <Form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <Field
                      type="text"
                      name="form"
                      v-model="form"
                      :rules="formRules"
                      class="w-full outline-none pl-3 overflow-y-auto"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      v-model="description"
                      class="w-full outline-none mt-2 pl-3 resize-none h-24"
                      placeholder="Açıklama"
                    ></Field>
                    <div class="ml-3 mr-3">
                      <label class="text-red-500 block">
                        <ErrorMessage name="description" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="form" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="date" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <Field
                      name="date"
                      v-model="date"
                      :format="dd - MM - YYYY"
                      :rules="dateRules"
                      type="date"
                      class="
                        h-auto
                        outline-none
                        ml-2
                        mt-2
                        mb-2
                        pl-3
                        border border-gray-300
                        rounded
                      "
                    />
                    <select
                      class="
                        h-auto
                        outline-none
                        ml-2
                        mt-2
                        mb-2
                        pl-3
                        border border-gray-300
                        rounded
                      "
                    >
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div>
                    <button type="submit" class="btn btn-primary bg-primary">
                      {{ t("inboxPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="btn btn-cancel"
                    >
                      {{ t("inboxPage.cancel") }}
                    </button>
                  </div>
                  <div>
                    <template v-if="this.description">
                      <p>{{ this.description.length }}</p>
                    </template>
                    <template v-else>
                      <p>0</p>
                    </template>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex" v-if="this.isLeftBarToggle == true">
      <LeftBar />
      <div class="w-full mt-5 p-4">
        <div class="w-1/2 mx-auto">
          <div class="w-full flex justify-between items-center">
            <div>
              <h1 class="text-xl font-bold">
                {{ t("inboxPage.headerTop") }}
              </h1>
            </div>
            <div>
              <button class="btn btn-comment mr-2">
                <CommentSvg />Yorumlar
              </button>
              <button class="btn btn-view mr-2"><ViewSvg />Görüntüle</button>
              <button class="btn btn-sort">
                <SortSvg />
                {{ t("inboxPage.sort") }}
              </button>
            </div>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <button class="tick-button mt-3 mr-1">
                  <TaskCheckBoxSvg class="tick" />
                </button>
                <div class="mt-2 ml-2 leading-5">
                  <p>{{ todo.title }}</p>
                  <p class="text-gray-500 text-xs">{{ todo.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-3" />
          <div v-if="this.isActive == false">
            <div>
              <button
                @click="onClick"
                class="add-task-button flex items-center mt-2"
              >
                <AddTaskSvg class="add-task-svg mt-1 mr-1" />
                <p class="add-task-text text-gray-500">
                  {{ t("inboxPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("inboxPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("inboxPage.text") }}
              </p>
              <div class="text-center">
                <button @click="onClick" class="btn btn-primary bg-primary">
                  {{ t("inboxPage.addTask") }}
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <Form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <Field
                      type="text"
                      name="form"
                      v-model="form"
                      :rules="formRules"
                      class="w-full outline-none pl-3"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      v-model="description"
                      :rules="descriptionRules"
                      class="
                        w-full
                        h-auto
                        outline-none
                        mt-2
                        pl-3
                        resize-none
                        overflow-y-hidden
                      "
                      placeholder="Açıklama"
                    ></Field>
                    <div class="ml-3 mr-3">
                      <label class="text-red-500 block">
                        <ErrorMessage name="description" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="form" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="date" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <Field
                      name="date"
                      v-model="date"
                      :format="dd - MM - YYYY"
                      :rules="dateRules"
                      type="date"
                      class="form-control w-40 m-2"
                    />
                    <select class="form-control ml-2">
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div>
                    <button
                      type="submit"
                      class="btn btn-primary bg-primary mr-2"
                    >
                      {{ t("inboxPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="btn btn-cancel"
                    >
                      {{ t("inboxPage.cancel") }}
                    </button>
                  </div>
                  <div>
                    <template v-if="this.description">
                      <p>{{ this.description.length }}</p>
                    </template>
                    <template v-else>
                      <p>0</p>
                    </template>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mt-5 p-4">
        <div class="w-1/2 mx-auto">
          <div class="w-full flex justify-between items-center">
            <div>
              <h1 class="font-bold text-xl">
                {{ t("inboxPage.headerTop") }}
              </h1>
            </div>
            <div>
              <button class="btn btn-comment mr-2">
                <CommentSvg />Yorumlar
              </button>
              <button class="btn btn-view mr-2"><ViewSvg />Görüntüle</button>
              <button class="btn btn-sort">
                <SortSvg />
                {{ t("inboxPage.sort") }}
              </button>
            </div>
          </div>
          <div v-if="taskItem">
            <div v-for="todo in taskItem" :key="todo.id">
              <hr class="mt-2" />
              <Tasks :todo="todo" />
            </div>
          </div>
          <hr class="mt-3" />
          <div v-if="this.isActive == false">
            <div>
              <button
                @click="onClick"
                class="add-task-button flex items-center mt-2"
              >
                <AddTaskSvg class="add-task-svg mt-1 mr-1" />
                <p class="add-task-text text-gray-500">
                  {{ t("inboxPage.addTask") }}
                </p>
              </button>
            </div>
            <div>
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("inboxPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("inboxPage.text") }}
              </p>
              <div class="text-center">
                <button
                  @click="onClick"
                  class="btn btn-primary bg-primary w-24 h-10"
                >
                  {{ t("inboxPage.addTask") }}
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <Form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                    shadow
                  "
                >
                  <div>
                    <Field
                      type="text"
                      name="title"
                      v-model="form.title"
                      :rules="formRules"
                      class="w-full outline-none pl-3 overflow-y-auto"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      v-model="form.description"
                      :rules="descriptionRules"
                      class="w-full outline-none mt-2 pl-3 resize-none h-24"
                      placeholder="Açıklama"
                    ></Field>
                    <div class="ml-3 mr-3">
                      <label class="text-red-500 w-12 block">
                        <ErrorMessage name="description" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="title" />
                      </label>
                      <label class="text-red-500 block">
                        <ErrorMessage name="date" />
                      </label>
                    </div>
                  </div>
                  <div class="m-2">
                    <Field
                      as="input"
                      name="date"
                      v-model="form.date"
                      type="date"
                      class="form-control w-40"
                    />
                    <!-- <Field
                      name="group"
                      v-model="group"
                      as="select"
                      class="form-control ml-2"
                    >
                      <option value="" selected disabled>Select</option>
                    </Field> -->
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div>
                    <button
                      type="submit"
                      class="
                        btn btn-primary
                        bg-primary
                        mr-2
                        transition
                        ease-in-out
                        transform
                        hover:-translate-y-1 hover:scale-110
                      "
                    >
                      {{ t("inboxPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="
                        btn btn-cancel
                        transition
                        ease-in-out
                        transform
                        hover:-translate-y-1 hover:scale-110
                      "
                    >
                      {{ t("inboxPage.cancel") }}
                    </button>
                  </div>
                  <div>
                    <template v-if="form.description">
                      <p class="text-sm text-gray-600">
                        {{ form.description.length }}
                      </p>
                    </template>
                    <template v-else>
                      <p class="text-sm text-gray-600">0</p>
                    </template>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tasks from "../components/Tasks.vue";
import TaskCheckBoxSvg from "../components/icons/TaskCheckBoxSvg.vue";
import ViewSvg from "../components/icons/ViewSvg.vue";
import CommentSvg from "../components/icons/CommentSvg.vue";
import TagModal from "../components/TagModal.vue";
import { useStore } from "vuex";
import { computed, reactive, onMounted, watch } from "vue";
import SortSvg from "@icons/SortSvg.vue";
import AddTodoSvg from "@icons/AddTodoSvg.vue";
import AddTaskSvg from "@icons/AddTaskSvg.vue";
import TickSvg from "@icons/TickSvg.vue";
import LeftBar from "@/components/Leftbar.vue";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useQuery, useMutation, useSubscription } from "villus";
import * as yup from "yup";

export default {
  name: "Today",
  data() {
    return {
      isActive: false,
      descriptionRules: yup.string().max(1000),
      formRules: yup.string().required().max(500),
      dateRules: yup.string().required(),
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    SortSvg,
    AddTaskSvg,
    AddTodoSvg,
    LeftBar,
    TickSvg,
    TagModal,
    CommentSvg,
    ViewSvg,
    TaskCheckBoxSvg,
    Tasks,
  },

  methods: {
    onClick() {
      this.isActive = true;
      console.log("is active", true);
    },
    onCancel() {
      this.isActive = false;
      console.log("is active", false);
    },
    onTick() {
      this.isTick = true;
      console.log("is tick", true);
      console.log(this.isTick);
    },
  },
  setup() {
    const store = useStore();
    const allTask = `
      query {
        tasks{
        id
        title
        description
        date
        created_at
        }
      }
    `;
    const tasks = `
      subscription {
        tasks {
          mutation
          data {
            id
            title
            description
            date
            created_at
          }
        }
}
`;

    onMounted(() => {
      useQuery({
        query: allTask,
      }).then(({ data }) => store.dispatch("task/GET_TASKS", data.value.tasks));
    });

    const { data: tasks_subscriber_data } = useSubscription({ query: tasks });

    watch(tasks_subscriber_data, ({ tasks }) => {
      if (tasks.mutation === "ADD_TASK") {
        store.dispatch("task/ADD_TASK", tasks.data);
      }
      if (tasks.mutation === "UPDATE_TASK") {
        store.dispatch("task/UPDATE_TASK", tasks.data);
      }
      if (tasks.mutation === "DELETE_TASK") {
        store.dispatch("task/DELETE_TASK", tasks.data);
      }
    });

    const form = reactive({
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });

    const { t } = useI18n();

    store.dispatch("GET_LEFTBAR_TOGGLE", false);
    const isLeftBarToggle = computed(() => store.state.todo.leftBarToggle);

    const taskItem = computed(() => store.state.task.tasks);

    const isToggleModal = computed(() => store.state.setting.tagToggle);

    const addTask = `
       mutation addTask($input: StoreTask!){
         addTask(input:$input){
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

    const { execute } = useMutation(addTask);

    const onSubmit = async (values, { resetForm }) => {
      const form = {
        ...values,
        user_id: 1,
        status: "active",
      };
      execute({ input: form });
      resetForm();
    };

    return {
      form,
      taskItem,
      isLeftBarToggle,
      isToggleModal,
      onSubmit,
      t,
    };
  },
};
</script>

<style scoped>
.today-header {
  font-size: 20px;
}

.today-span {
  font-size: 13px;
}

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
