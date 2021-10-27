<template>
  <div v-if="isToggleModal">
    <TagModal />
    <div class="flex" v-if="this.isLeftBarToggle == true">
      <LeftBar />
      <div class="w-full mt-5 p-4">
        <div class="w-1/2 mx-auto">
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center">
              <h1 class="today-header font-bold">{{ t("todayPage.today") }}</h1>
              <span class="today-span ml-2 text-gray-400">{{
                t("todayPage.dt")
              }}</span>
            </div>
            <button>
              <SortSvg />
              {{ t("todayPage.sort") }}
            </button>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <div
                  @click="onTick"
                  class="
                    mt-2
                    border border-gray-500
                    rounded-full
                    h-7
                    w-7
                    flex
                    items-center
                    justify-center
                  "
                >
                  <input
                    v-model="isTick"
                    type="checkbox"
                    class="outline-none"
                  />
                </div>
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
                  {{ t("todayPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("todayPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("todayPage.text") }}
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
                  {{ t("todayPage.addTask") }}
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
                      <!-- <label class="text-red-500">
                        <ErrorMessage name="date" />
                      </label> -->
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
                      class="p-1 bg-red-500 text-white rounded"
                    >
                      {{ t("todayPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="
                        ml-4
                        p-1
                        bg-white
                        text-black
                        border
                        rounded
                        border-gray-300
                      "
                    >
                      {{ t("todayPage.cancel") }}
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
            <div class="flex items-center">
              <h1 class="today-header font-bold">{{ t("todayPage.today") }}</h1>
              <span class="today-span ml-2 text-gray-400">{{
                t("todayPage.dt")
              }}</span>
            </div>
            <button>
              <SortSvg />
              {{ t("todayPage.sort") }}
            </button>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <div
                  @click="onTick"
                  class="
                    mt-2
                    border border-gray-500
                    rounded-full
                    h-7
                    w-7
                    flex
                    items-center
                    justify-center
                  "
                >
                  <input
                    v-model="isTick"
                    type="checkbox"
                    class="outline-none"
                  />
                </div>
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
                  {{ t("todayPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("todayPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("todayPage.text") }}
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
                  {{ t("todayPage.addTask") }}
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
                      <!-- <label class="text-red-500">
                        <ErrorMessage name="date" />
                      </label> -->
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
                    <button
                      type="submit"
                      class="
                        p-1
                        pl-2
                        pr-2
                        add-task
                        font-medium
                        text-white
                        rounded
                      "
                    >
                      {{ t("todayPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="
                        ml-4
                        p-1
                        w-14
                        font-medium
                        border border-gray-300
                        bg-white
                        text-black
                        border
                        rounded
                        hover:bg-gray-200 hover:border-gray-400
                      "
                    >
                      {{ t("todayPage.cancel") }}
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
            <div class="flex items-center">
              <h1 class="today-header font-bold">{{ t("todayPage.today") }}</h1>
              <span class="today-span ml-2 text-gray-400">{{
                t("todayPage.dt")
              }}</span>
            </div>
            <button>
              <SortSvg />
              {{ t("todayPage.sort") }}
            </button>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <div
                  @click="onTick"
                  class="
                    mt-2
                    border border-gray-500
                    rounded-full
                    h-7
                    w-7
                    flex
                    items-center
                    justify-center
                  "
                >
                  <input
                    v-model="isTick"
                    type="checkbox"
                    class="outline-none"
                  />
                </div>
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
                  {{ t("todayPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("todayPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("todayPage.text") }}
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
                  {{ t("todayPage.addTask") }}
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
                      <!-- <label class="text-red-500">
                        <ErrorMessage name="date" />
                      </label> -->
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
                    <button
                      type="submit"
                      class="p-1 bg-red-500 text-white rounded"
                    >
                      {{ t("todayPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="
                        ml-4
                        p-1
                        bg-white
                        text-black
                        border
                        rounded
                        border-gray-300
                      "
                    >
                      {{ t("todayPage.cancel") }}
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
            <div class="flex items-center">
              <h1 class="today-header font-bold">{{ t("todayPage.today") }}</h1>
              <span class="today-span ml-2 text-gray-400">{{
                t("todayPage.dt")
              }}</span>
            </div>
            <button>
              <SortSvg />
              {{ t("todayPage.sort") }}
            </button>
          </div>
          <div v-if="data">
            <div v-for="todo in data.tasks" :key="todo.id">
              <hr class="mt-2" />
              <div class="flex">
                <div
                  @click="onTick"
                  class="
                    mt-2
                    border border-gray-500
                    rounded-full
                    h-7
                    w-7
                    flex
                    items-center
                    justify-center
                  "
                >
                  <input
                    v-model="isTick"
                    type="checkbox"
                    class="outline-none"
                  />
                </div>
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
                  {{ t("todayPage.addTask") }}
                </p>
              </button>
            </div>
            <div class="">
              <AddTodoSvg class="w-2/6 mt-5 mx-auto" />
              <h1 class="add-task-header text-center text-gray-900 mt-2 mb-2">
                {{ t("todayPage.header") }}
              </h1>
              <p class="add-task-text text-center text-gray-500 mb-2">
                {{ t("todayPage.text") }}
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
                  {{ t("todayPage.addTask") }}
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
                      :rules="descriptionRules"
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
                      <!-- <label class="text-red-500">
                        <ErrorMessage name="date" />
                      </label> -->
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
                    <Field
                      name="group"
                      v-model="group"
                      as="select"
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
                      <option value="" selected disabled>Select</option>
                    </Field>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div>
                    <button
                      type="submit"
                      class="
                        p-1
                        pl-2
                        pr-2
                        add-task
                        font-medium
                        text-white
                        rounded
                      "
                    >
                      {{ t("todayPage.addTask") }}
                    </button>
                    <button
                      @click="onCancel"
                      type="button"
                      class="
                        ml-4
                        p-1
                        w-14
                        font-medium
                        border border-gray-300
                        bg-white
                        text-black
                        border
                        rounded
                        hover:bg-gray-200 hover:border-gray-400
                      "
                    >
                      {{ t("todayPage.cancel") }}
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
</template>

<script>
import TagModal from "../components/TagModal.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import SortSvg from "@icons/SortSvg.vue";
import AddTodoSvg from "@icons/AddTodoSvg.vue";
import AddTaskSvg from "@icons/AddTaskSvg.vue";
import TickSvg from "@icons/TickSvg.vue";
import LeftBar from "@/components/Leftbar.vue";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useQuery, useMutation } from "villus";
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
    const form = ref();
    const description = ref();
    const date = ref(new Date().toISOString().slice(0, 10));
    const { t } = useI18n();
    const store = useStore();
    store.dispatch("GET_LEFTBAR_TOGGLE", false);
    const isLeftBarToggle = computed(() => store.state.todo.leftBarToggle);

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

    const { data } = useQuery({
      query: allTask,
    });

    const { execute } = useMutation(addTask);

    function onSubmit() {
      console.log(form.value);
      console.log(date.value);
      execute({
        input: {
          user_id: 1,
          title: form.value,
          description: description.value,
          date: date.value,
          status: "active",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const isToggleModal = computed(() => store.state.setting.tagToggle);

    // const addTag = `
    // mutation addTag($input: TagInput){
    //   addTag(input:$input){
    //     name
    //     color
    //     status
    //   }
    // }
    // `;

    // const { execute } = useMutation(addTag);

    // function tagSubmit() {
    //   execute({
    //     input: {
    //       user_id: 1,
    //       labelName: labelName.value,
    //       labelColor: labelColor.value,
    //       status: "active",
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   console.log(labelName.value);
    //   console.log(labelColor.value);
    // }

    return {
      // labelName,
      // labelColor,
      form,
      description,
      date,
      data,
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

.add-task-button:hover {
  color: red !important;
}

.add-task-header {
  font-size: 16px;
}

.add-task-text {
  font-size: 14px;
}

.add-task-button-general {
  font-size: 13px;
  background-color: #db4c3f;
}

textarea {
  font-size: 13px;
}

.add-task {
  background-color: #db4c3f;
  font-size: 16px;
}
</style>
