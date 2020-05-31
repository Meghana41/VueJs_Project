<template>
  <div class="home">
    <Headlines msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Headlines from "@/components/Headlines.vue";

export default {
  name: "Home",
  components: {
    Headlines
  }
};
</script>
