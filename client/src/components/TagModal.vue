<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80">
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
          <button type="button" :title="t('toggleTag.title')">
            <QuestionSvg />
          </button>
        </div>
      </div>
      <hr class="border-gray-300" />
      <div class="p-4">
        <Form @submit="tagSubmit" autocomplete="off">
          <div class="mb-3">
            <div class="flex justify-between">
              <label class="font-bold">{{ t("toggleTag.label") }}</label>
              <label class="text-red-500"
                ><ErrorMessage name="labelName"
              /></label>
            </div>
            <Field
              name="labelName"
              v-model="labelName"
              class="h-7 pl-2 block border border-gray-300 w-full rounded"
              type="text"
              :rules="labelNameRules"
            />
          </div>
          <div>
            <div class="flex justify-between">
              <label class="font-bold">{{ t("toggleTag.color") }}</label>
              <label class="text-red-500"
                ><ErrorMessage name="labelColor"
              /></label>
            </div>
            <Field
              as="select"
              name="labelColor"
              v-model="labelColor"
              :rules="labelColorRules"
              class="h-7 pl-2 block border border-gray-300 w-full rounded"
            >
              <option value="" selected disabled>Select</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
            </Field>
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
              type="submit"
              class="add-task-button-general text-white p-1 ml-2 w-12"
            >
              {{ t("toggleTag.add") }}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionSvg from "./icons/QuestionSvg.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useMutation } from "villus";
export default {
  name: "TagModal",
  components: {
    QuestionSvg,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      labelNameRules: yup.string().required().max(60),
      labelColorRules: yup.string().required(),
    };
  },
  setup() {
    const { t } = useI18n();
    const labelName = ref();
    const labelColor = ref();
    const store = useStore();

    function onCloseTagToggle() {
      store.dispatch("GET_TAG_TOGGLE", false);
    }

    const addTag = `
    mutation addTag($input:TagInput){
        addTag(input:$input){
        id
        user_id
        name
        color
        status
        }
    }
    `;

    const { execute } = useMutation(addTag);

    function tagSubmit() {
      execute({
        input: {
          user_id: 1,
          name: labelName.value,
          color: labelColor.value,
          status: "active",
        },
      })
        .then((res) => {
          console.log(res.data.addTag);
          store.dispatch("ADD_TAG", res.data.addTag);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      labelName,
      labelColor,
      onCloseTagToggle,
      tagSubmit,
      t,
    };
  },
};
</script>

<style scoped>
.add-task-button-general {
  font-size: 13px;
  background-color: #db4c3f;
}
</style>
