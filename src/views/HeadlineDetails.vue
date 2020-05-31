<template>
  <div class="headlineDetail">
   
    <v-layout row>
      <v-card class="mb-6 ml-3" width="1220">
        <v-layout>
          <v-btn class="mt-4 ml-4" to="/" fab dark small color="blue darken-2">
            <v-icon dark>mdi-arrow-left</v-icon>
          </v-btn>
          <v-card-title class="Headline">{{ headlineDetails.title}}</v-card-title>

          <v-spacer></v-spacer>
 <!--Edit Dialog -->
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="mt-4 mr-4" v-on="on" fab dark small color="blue darken-2">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Edit Headline Title
                <v-spacer></v-spacer>
                <v-icon color="primary" text @click="dialog = false">mdi-close</v-icon>
              </v-card-title>

              <v-card-text>
                <v-form class="px-3" ref="form">
                  <v-text-field
                    label="Title"
                    v-model="headlineEditTitle"
                    :rules="inputRules"
                    clearable
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="save">Save</v-btn>
                <v-btn color="primary" text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--/Edit Dialog --->
        </v-layout>

        <v-img
          class="mx-auto mb-6"
          height="300"
          width="500"
          v-bind:src="headlineDetails.urlToImage"
        ></v-img>
        <p
          class="grey--text ml-4"
        >{{headlineDetails.author}} , publishedAt: {{ headlineDetails.publishedAt}}</p>

        <div class="ml-4 mb-6 title">{{ headlineDetails.description}}</div>

        <ul>
          <li class="body-1 mb-6">
            {{ headlineDetails.content}}
            <a
              class="mx-auto"
              v-bind:href="headlineDetails.url"
              target="_blank"
            >...Know More</a>
          </li>
        </ul>
      </v-card>

      <!--History-->
      <v-card class="mb-6 ml-6" width="400" height="700">
        <v-card-title>Recently Viewed News</v-card-title>

        <v-card-text>
          <ul v-for="history in userHistory" :key="history.title">
            <li>
              <a v-bind:href="headlineDetails.url" target="_blank">{{ history.title }}</a>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>


<script>
import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    userHistory: [],
    addTask: function(task) {
      this.state.userHistory.push(task);
    }
  },
  mutations: {
    increment(state, n) {
      state.userHistory.push(n);
    }
  }
});

export default {
  mounted() {
    localStorage.getItem("data");
    this.headlineData = JSON.parse(localStorage.getItem("data"));
    console.log(localStorage.getItem("data"));
  },
  store: store,
  computed: {
    userHistory: function() {
      return this.$store.state.userHistory;
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.headlineDetails.title = this.headlineEditTitle;
        console.log(this.headlineEditTitle);
        this.dialog = false;
      }
    }
  },

  data() {
    return {
      headlineData: null,
      headlineDetails: null,
      headlineEditTitle: null,
      dialog: false,
      inputRules: [v => v.length >= 5 || "Minimum length is 5 characters"]
    };
  },
  created() {
    this.headlineDetails = this.$route.params.headlineDataInfo;
    this.headlineEditTitle = this.headlineDetails.title;
    this.$store.commit("increment", this.headlineDetails);
  }
};
</script>

<style scoped>
</style>
