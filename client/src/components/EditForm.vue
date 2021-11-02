<template>
  <Form
    @submit="
      onSubmit({
        id: todo.id,
        title: todo.title,
        description: todo.description,
      })
    "
  >
    <div
      class="border border-gray-300 mt-2 focus:border-gray-700 rounded shadow"
    >
      <div>
        <Field
          type="text"
          name="form"
          v-model="form"
          :value="todo.title"
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
          :value="todo.description"
          :rules="descriptionRules"
          class="w-full outline-none mt-2 pl-3 resize-none h-24"
          placeholder="Açıklama"
        ></Field>
        <div class="ml-3 mr-3">
          <label class="text-red-500 w-12 block">
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
      <div class="m-2">
        <Field
          name="date"
          v-model="date"
          :value="todo.date"
          :rules="dateRules"
          :format="dd - MM - YYYY"
          type="date"
          class="form-control w-40"
        />
        <Field
          name="group"
          v-model="group"
          as="select"
          class="form-control ml-2"
        >
          <option value="" selected disabled>Select</option>
        </Field>
      </div>
    </div>
    <div class="flex justify-between items-center mt-2">
      <div>
        <button type="submit" class="btn btn-primary bg-primary w-28 h-8">
          {{ t("inboxPage.updateTask") }}
        </button>
        <button
          @click="onCloseEditTask"
          type="button"
          class="btn btn-cancel ml-2"
        >
          {{ t("inboxPage.cancel") }}
        </button>
      </div>
      <div>
        <template v-if="this.description">
          <p class="text-sm text-gray-600">
            {{ this.description.length }}
          </p>
        </template>
        <template v-else>
          <p class="text-sm text-gray-600">0</p>
        </template>
      </div>
    </div>
  </Form>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useMutation } from "villus";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
export default {
  name: "EditForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    todo: Object,
    isTagEdit: Boolean,
  },
  data() {
    return {
      formRules: yup.string(),
      descriptionRules: yup.string(),
      dateRules: yup.string(),
    };
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const form = ref();
    const description = ref();
    const date = ref(new Date().toISOString().slice(0, 10));
    const updateTask = `
    mutation updateTask($input: UpdateInput){
      updateTask(input: $input){
        id
        user_id
        title
        description
        date
      }
    }
`;

    const { execute } = useMutation(updateTask);

    function onSubmit(value) {
      execute({
        input: {
          id: value.id,
          title: form.value,
          description: description.value,
        },
      })
        .then((res) => {
          store.dispatch("UPDATE_TASK", res.data.updateTask);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function onCloseEditTask() {
      store.dispatch("GET_INPUT_TOGGLE", false);
    }

    return { form, description, date, onSubmit, onCloseEditTask, t };
  },
};
</script>
