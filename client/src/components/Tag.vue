<template>
  <div
    class="
      overflow-hidden
      fixed
      top-0
      left-0
      bg-gray-900 bg-opacity-60
      w-full
      p-12
      h-full
      flex
      items-center
      justify-center
    "
  >
    <div class="bg-white w-1/3 mx-auto rounded-lg">
      <div class="flex justify-between bg-gray-50 rounded-t-lg p-3">
        <div class="pl-3 pr-3">
          <h1 class="font-bold">Etiketi düzenle</h1>
        </div>
        <div>
          <button class="hover:bg-gray-300 hover:text-white" type="button">
            <CloseSvg class="w-6 h-6" />
          </button>
        </div>
      </div>
      <hr />
      <div class="m-4">
        <Form @submit="onUpdate" :initial-values="tag" autocomplete="off">
          <div class="m-4">
            <div class="flex justify-between">
              <label class="block font-bold mb-1 text-sm" for="name"
                >Etiket adı</label
              >
              <label class="text-red-500 mb-1 text-sm">
                <ErrorMessage name="name" />
              </label>
            </div>
            <Field
              class="
                w-full
                border
                outline-none
                border-gray-300
                pl-2
                rounded
                h-9
                text-sm
              "
              type="text"
              :rules="labelName"
              :value="tag.name"
              v-model="form.name"
              name="name"
              id="name"
            />
          </div>
          <div class="m-4">
            <div class="flex justify-between">
              <label class="block font-bold mb-1 text-sm" for="color"
                >Etiket rengi</label
              >
              <label class="text-red-500 mb-1 text-sm">
                <ErrorMessage name="color" />
              </label>
            </div>

            <Field
              as="select"
              class="
                w-full
                border
                outline-none
                border-gray-300
                pl-2
                rounded
                h-9
                text-sm
              "
              :rules="labelColor"
              :value="tag.color"
              v-model="form.color"
              id="color"
              name="color"
            >
              <option value="red" :selected="tag.color ? true : false">
                Red
              </option>
              <option value="blue" :selected="tag.color ? true : false">
                Blue
              </option>
              <option value="yellow" :selected="tag.color ? true : false">
                Yellow
              </option>
            </Field>
            <hr class="mb-5 mt-5" />
            <div class="flex items-center justify-end ml-4 mt-4 mb-4">
              <button type="button" class="btn btn-cancel mr-2">İptal</button>
              <button type="submit" class="btn btn-primary bg-primary">
                Kaydet
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import CloseSvg from "./icons/CloseSvg.vue";
import { reactive } from "vue";
import { useMutation } from "villus";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
export default {
  name: "Tag",
  components: {
    CloseSvg,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    tag: Object,
  },
  data() {
    return {
      labelName: yup.string().max(60),
      labelColor: yup.string(),
    };
  },
  setup() {
    const store = useStore();
    const { t } = useI18n;
    const form = reactive({
      name: "",
      color: "",
    });

    const updateTask = `
    mutation updateTag($input: UpdateInput){
      updateTag(input: $input){
        id
        user_id
        name
        color
      }
    }
    `;

    const { execute } = useMutation(updateTask);

    const onUpdate = async (values, { resetForm }) => {
      const form = {
        ...values,
      };
      execute({
        input: form,
      });
      resetForm();
      // store.dispatch("", false);
    };

    return {
      form,
      onUpdate,
      t,
    };
  },
};
</script>
