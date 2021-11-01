<template>
  <form @submit="onSubmit">
    <input
      :value="todo.title"
      type="text"
      class="border rounded border-red-500 w-full"
    />
    <textarea
      :value="todo.description"
      class="w-full outline-none resize-none border border-gray-400"
    ></textarea>
    <div class="flex justify-end border border-gray-800">
      <button type="button" @click="onCloseEditTask" class="mr-3">İptal</button>
      <input class="cursor-pointer" type="submit" value="Güncelle" />
    </div>
  </form>
</template>

<script>
import { useMutation } from "villus";
export default {
  name: "EditForm",
  props: {
    todo: Object,
    isTagEdit: Boolean,
  },
  methods: {
    onCloseEditTask(value) {
      isTagEdit = false;
      console.log(isTagEdit);
    },
  },
  setup() {
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

    function onSubmit() {
      execute({
        input: {
          id: 11,
          title: "kemasdal",
          description: "beksadcan",
        },
      });
    }

    return { onSubmit };
  },
};
</script>
