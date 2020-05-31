<template>
  <v-app>
    <v-app-bar app color="indigo darken3" dark>
      <span class="headline">News</span>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content class="mx-6 mt-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
