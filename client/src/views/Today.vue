<template>
  <div v-if="isToggleModal">
    <div
      class="
        absolute
        top-0
        left-0
        border border-blue-500
        w-full
        h-full
        bg-gray-900 bg-opacity-80
      "
    >
      <div
        class="card w-1/4 bg-white transform translate-y-52 mx-auto rounded-xl"
      >
        <div
          class="flex bg-gray-100 rounded-t-xl p-4 justify-between items-center"
        >
          <div>
            <h1 class="font-bold">{{ t("toggleTag.header") }}</h1>
          </div>
          <div>
            <button>
              <QuestionSvg />
            </button>
          </div>
        </div>
        <hr class="border-gray-300" />
        <div class="p-4">
          <form>
            <div class="mb-3">
              <label class="font-bold">{{ t("toggleTag.label") }}</label>
              <input
                class="h-7 pl-2 block border border-gray-300 w-full rounded"
                type="text"
              />
            </div>
            <div>
              <label class="font-bold">{{ t("toggleTag.color") }}</label>
              <select
                class="h-7 pl-2 block border border-gray-300 w-full rounded"
              >
                <option value="">Red</option>
                <option value="">Blue</option>
                <option value="">Yellow</option>
              </select>
            </div>
            <hr class="border-gray-300 mb-4 mt-4" />
            <div class="flex justify-end">
              <button
                @click="onCloseTagToggle"
                type="button"
                class="
                  border border-gray-300
                  ml-2
                  mr-2
                  p-1
                  w-12
                  hover:bg-gray-200
                "
              >
                {{ t("toggleTag.cancel") }}
              </button>
              <button
                class="add-task-button-general text-white p-1 ml-2 mr-2 w-12"
              >
                {{ t("toggleTag.add") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
              <form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <input
                      type="text"
                      name="form"
                      v-model="form"
                      class="w-full outline-none pl-3"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      v-model="description"
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
                    ></textarea>
                  </div>
                  <div>
                    <input
                      name="date"
                      v-model="date"
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
                    <!-- <template v-if="this.description">
                    <p>{{ this.description.length }}</p>
                  </template>
                  <template v-else>
                    <p>0</p>
                  </template> -->
                  </div>
                </div>
                <div class="mt-2">
                  <!-- <p class="text-red-500">{{ titleError }}</p>
                <p class="text-red-500">{{ descriptionError }}</p> -->
                </div>
              </form>
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
              <form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <input
                      type="text"
                      name="form"
                      v-model="form"
                      class="w-full outline-none pl-3 overflow-y-auto"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      v-model="description"
                      class="w-full outline-none mt-2 pl-3 resize-none h-24"
                      placeholder="Açıklama"
                    ></textarea>
                    <div class="m-2">
                      <!-- <p class="text-red-500">{{ titleError }}</p>
                    <p class="text-red-500">{{ descriptionError }}</p> -->
                    </div>
                  </div>
                  <div>
                    <input
                      name="date"
                      v-model="date"
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
                    <!-- <template v-if="this.description">
                    <p>{{ this.description.length }}</p>
                  </template>
                  <template v-else>
                    <p>0</p>
                  </template> -->
                  </div>
                </div>
              </form>
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
              <form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <input
                      type="text"
                      name="form"
                      v-model="form"
                      class="w-full outline-none pl-3"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      v-model="description"
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
                    ></textarea>
                  </div>
                  <div>
                    <input
                      name="date"
                      v-model="date"
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
                    <!-- <template v-if="this.description">
                    <p>{{ this.description.length }}</p>
                  </template>
                  <template v-else>
                    <p>0</p>
                  </template> -->
                  </div>
                </div>
                <div class="mt-2">
                  <!-- <p class="text-red-500">{{ titleError }}</p>
                <p class="text-red-500">{{ descriptionError }}</p> -->
                </div>
              </form>
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
              <form @submit="onSubmit" autocomplete="off">
                <div
                  class="
                    border border-gray-300
                    mt-2
                    focus:border-gray-700
                    rounded
                  "
                >
                  <div>
                    <input
                      type="text"
                      name="form"
                      v-model="form"
                      class="w-full outline-none pl-3 overflow-y-auto"
                      placeholder="ör., Her 1 Mayıs'ta spor üyeliğini yenile #Sağlık"
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      v-model="description"
                      class="w-full outline-none mt-2 pl-3 resize-none h-24"
                      placeholder="Açıklama"
                    ></textarea>
                    <div class="m-2">
                      <!-- <p class="text-red-500">{{ titleError }}</p>
                    <p class="text-red-500">{{ descriptionError }}</p> -->
                    </div>
                  </div>
                  <div>
                    <input
                      name="date"
                      v-model="date"
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
                    <!-- <template v-if="this.description">
                    <p>{{ this.description.length }}</p>
                  </template>
                  <template v-else>
                    <p>0</p>
                  </template> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionSvg from "../components/icons/QuestionSvg.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import SortSvg from "@icons/SortSvg.vue";
import AddTodoSvg from "@icons/AddTodoSvg.vue";
import AddTaskSvg from "@icons/AddTaskSvg.vue";
import TickSvg from "@icons/TickSvg.vue";
import LeftBar from "@/components/Leftbar.vue";
import { useI18n } from "vue-i18n";
import { useForm, useField } from "vee-validate";
import { useQuery, useMutation } from "villus";
import * as yup from "yup";

export default {
  name: "Today",
  data() {
    return {
      isActive: false,
    };
  },
  components: {
    SortSvg,
    AddTaskSvg,
    AddTodoSvg,
    LeftBar,
    TickSvg,
    QuestionSvg,
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

    function onSubmit(event) {
      event.preventDefault();
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

    function onCloseTagToggle() {
      store.dispatch("GET_TAG_TOGGLE", false);
    }

    const isToggleModal = computed(() => store.state.setting.tagToggle);

    return {
      form,
      description,
      date,
      data,
      isLeftBarToggle,
      isToggleModal,
      onCloseTagToggle,
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
