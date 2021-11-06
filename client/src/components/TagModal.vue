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
              <label class="text-red-500"><ErrorMessage name="name" /></label>
            </div>
            <Field
              name="name"
              v-model="form.name"
              class="h-7 pl-2 block border border-gray-300 w-full rounded"
              type="text"
              :rules="labelNameRules"
            />
          </div>
          <div>
            <div class="flex justify-between">
              <label class="font-bold">{{ t("toggleTag.color") }}</label>
              <label class="text-red-500"><ErrorMessage name="color" /></label>
            </div>
            <Field
              as="select"
              name="color"
              v-model="form.color"
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
                btn btn-cancel
                transition
                ease-in-out
                transform
                hover:-translate-y-1 hover:scale-110
                mr-2
              "
            >
              {{ t("toggleTag.cancel") }}
            </button>
            <button
              type="submit"
              class="
                btn btn-primary
                bg-primary
                transition
                ease-in-out
                transform
                hover:-translate-y-1 hover:scale-110
              "
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
import { reactive } from "vue";
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
    const store = useStore();

    const form = reactive({
      name: "",
      color: "",
    });

    function onCloseTagToggle() {
      store.dispatch("GET_TAG_TOGGLE", false);
    }

    const addTag = `
   mutation addTag($input: TagInput){
      addTag(input: $input){
        id
        user_id
        name
        color
      }
    }
    `;

    const { execute } = useMutation(addTag);

    const tagSubmit = async (values, { resetForm }) => {
      console.log("tagValues", values);
      const form = {
        ...values,
        user_id: 1,
        status: "active",
      };
      execute({
        input: form,
      });
      resetForm();
    };

    return {
      form,
      onCloseTagToggle,
      tagSubmit,
      t,
    };
  },
};
</script>
