<template>
  <tr class="whitespace-nowrap">
    <td class="px-6 py-4">{{ todo.id }}</td>
    <td class="px-6 py-4">{{ todo.name }}</td>
    <td class="px-6 py-4">{{ todo.description }}</td>
    <td class="px-6 py-4">{{ todo.price }}</td>
    <td class="px-6 py-4">{{ todo.select }}</td>
    <td>
      <div class="flex px-6 py-4">
        <p>{{ todo.status }}</p>
        <div>active</div>
      </div>
    </td>
    <td class="px-6 py-4">
      <EditButton />
    </td>
    <td class="px-6 py-4"><DeleteButton :id="todo.id" /></td>
  </tr>
</template>

<script>
import EditButton from "@/components/EditButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
export default {
  name: "Todo",
  components: {
    EditButton,
    DeleteButton,
  },
  props: {
    todo: Object,
  },
};
</script>
