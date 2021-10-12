<template>
  <tr class="whitespace-nowrap">
    <td class="px-6 py-4">{{ todo.name }}</td>
    <td class="px-6 py-4">{{ todo.description }}</td>
    <td class="px-6 py-4">{{ todo.price }}</td>
    <td class="px-6 py-4">{{ todo.select }}</td>
    <td>
      <div class="flex">
        <p>{{ todo.status }}</p>
        <div>active</div>
      </div>
    </td>
    <td>
      <EditButton
        brColor="1px solid blue"
        color="blue"
        textColor="#fff"
        icon="far fa-edit"
      />
    </td>
  </tr>
</template>

<script>
import EditButton from "@/components/EditButton.vue";
export default {
  name: "Todo",
  components: {
    EditButton,
  },
  props: {
    todo: Object,
  },
};
</script>
