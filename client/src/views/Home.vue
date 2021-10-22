<template>
  <div v-if="this.isLeftBarToggle == true">
    <div class="home flex">
      <Leftbar @label-toggle="labelToggle" />
      <div v-if="this.isTagToggle == true">
        <div
          class="
            absolute
            left-0
            top-0
            bg-gray-900
            min-h-screen
            w-full
            z-0
            bg-opacity-80
          "
        >
          <div
            class="
              card
              bg-white bg-opacity-100
              z-40
              w-1/4
              mx-auto
              transform
              translate-y-52
              rounded-xl
            "
          >
            <div
              class="
                bg-gray-50
                border-b border-gray-300
                p-5
                rounded-t-xl
                flex
                justify-between
              "
            >
              <h1 class="label-header font-bold">{{ t("homePage.header") }}</h1>
              <button :title="t('homePage.title')">
                <QuestionSvg />
              </button>
            </div>
            <div>
              <form @submit="onSubmit">
                <div class="p-5">
                  <div class="flex justify-between">
                    <label class="label-name font-bold" for="label">{{
                      t("homePage.label")
                    }}</label>
                    <p class="text-xs text-red-500">{{ labelError }}</p>
                  </div>
                  <input
                    name="name"
                    v-model="name"
                    class="
                      border
                      w-full
                      mt-1
                      rounded
                      h-8
                      pl-2
                      border-gray-300
                      outline-none
                    "
                    id="label"
                    type="text"
                  />
                </div>
                <div class="p-5">
                  <label class="label-color font-bold" for="label">{{
                    t("homePage.color")
                  }}</label>
                  <select
                    name="color"
                    v-model="color"
                    class="
                      border
                      cursor-pointer
                      w-full
                      mt-1
                      rounded
                      h-8
                      pl-2
                      border-gray-300
                      outline-none
                    "
                    id="label"
                  >
                    <option value="" selected>Select one</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
                <hr class="mb-3 border-gray-300" />
                <div class="flex justify-end items-center p-5" v-if="this.name">
                  <button
                    @click="onLabelToggleClose"
                    type="button"
                    class="
                      p-1
                      border border-gray-400
                      hover:border-gray-600
                      bg-gray-100
                      rounded
                      mr-3
                      pr-3
                      pl-3
                    "
                  >
                    {{ t("homePage.cancel") }}
                  </button>
                  <button class="add-label p-1 pr-5 pl-5 rounded text-white">
                    {{ t("homePage.add") }}
                  </button>
                </div>
                <div class="flex justify-end items-center p-5" v-else>
                  <button
                    @click="onLabelToggleClose"
                    type="button"
                    class="
                      p-1
                      border border-gray-400
                      hover:border-gray-600
                      bg-gray-100
                      rounded
                      mr-3
                      pr-3
                      pl-3
                    "
                  >
                    {{ t("homePage.cancel") }}
                  </button>
                  <button
                    class="
                      bg-red-200
                      cursor-not-allowed
                      p-1
                      pr-5
                      pl-5
                      rounded
                      text-white
                      disabled
                    "
                  >
                    {{ t("homePage.add") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
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
  </div>
  <div v-else>
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
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo.vue";
import Leftbar from "@/components/Leftbar.vue";
import QuestionSvg from "@/components/icons/QuestionSvg.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useMutation } from "villus";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    AddTodo,
    Leftbar,
    QuestionSvg,
  },
  data() {
    return {
      isTagToggle: false,
      form: {
        labelName: "",
        labelColor: "",
      },
    };
  },
  methods: {
    labelToggle(value) {
      this.isTagToggle = value;
    },
    onLabelToggleClose() {
      this.isTagToggle = false;
    },
  },
  setup() {
    const name = ref();
    const color = ref();
    const { t } = useI18n();
    const store = useStore();
    store.dispatch("GET_LEFTBAR_TOGGLE", false);
    const isLeftBarToggle = computed(() => store.state.todo.leftBarToggle);
    const schema = yup.object({
      labelName: yup.string().required().min(1).max(60),
    });

    useForm({
      validationSchema: schema,
    });

    const { value: labelName, errorMessage: labelError } =
      useField("labelName");

    const addTag = `
      mutation addTag($input: TagInput!){
  addTag(input:$input){
    user_id
    name
    color
    status
  }
}`;

    const { data, execute } = useMutation(addTag);

    // const variables = {
    //   input: {
    //     user_id: 1,
    //     name: form.value,
    //     color: "asdsadas",
    //     status: "active",
    //   },
    // };

    function onSubmit(event) {
      event.preventDefault();
      execute({
        input: {
          user_id: 1,
          name: name.value,
          color: color.value,
          status: "active",
        },
      });
      console.log(name.value);
      console.log(color.value);
    }

    return {
      name,
      color,
      data,
      execute,
      onSubmit,
      labelName,
      labelError,
      isLeftBarToggle,
      t,
    };
  },
};
</script>

<style scoped>
.add-label {
  background-color: #db4c3f;
}
.label-header {
  font-size: 16px;
}
.label-name {
  font-size: 14px;
}
.label-color {
  font-size: 14px;
}
</style>
