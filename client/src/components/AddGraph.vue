<template>
  <button v-on:click="onClick">Add Task</button>
</template>

<script>
import { useMutation } from "villus";
export default {
  name: "AddGraph",
  setup() {
    const addTask = `
    mutation addTask($id: ID){
        addTask($id: ID){
            id
        }
    }
    `;
    const { data, execute } = useMutation(addTask);

    const variables = {
      id: 123,
    };

    const onClick = (event) => {
      execute(variables);
      console.log("tiklandi");
    };

    return {
      data,
      variables,
      onClick,
    };
  },
};
</script>
