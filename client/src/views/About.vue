<template>
  <!-- Edit Page -->
  <div class="copyright">
    <div>
      <h1>About</h1>
      <AddGraph />
    </div>
  </div>
</template>

<script>
import AddGraph from "../components/AddGraph.vue";
export default {
  name: "About",
  components: {
    AddGraph,
  }
};
</script>
