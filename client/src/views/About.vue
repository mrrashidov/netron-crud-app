<template>
  <!-- Edit Page -->
  <div class="copyright">
    <div>
      <h1>About</h1>
      <div v-if="data">
        <pre>{{ data }}</pre>
      </div>
      <AddGraph />
    </div>
  </div>
</template>

<script>
import AddGraph from "../components/AddGraph.vue"
import { useQuery } from "villus";
export default {
  name: "About",
  components: {
    AddGraph
  },
  setup() {
    const { data } = useQuery({
      query: "{tasks {id, name, description, price, select, status}}",
    });

    return {
      data,
    };
  },
};
</script>
