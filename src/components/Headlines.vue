<template>
  <div class="news">
    <v-layout class="mb-3">
      <p class="headline grey--text">Headlines</p>
      <v-spacer></v-spacer>

      <!---Search---->
      <div class="mr-6">
        <autocomplete
          :search="search"
          placeholder="Search News"
          aria-label="Search News"
          :get-result-value="getResultValue"
        ></autocomplete>
      </div>
      <!---/search--->
      <!---Filter--->
      <div class="mr-3">
        <v-row justify="center">
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn large color="primary" dark v-on="on">Filter</v-btn>
            </template>
            <v-card>
              <v-card-title>Select News Feed</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 300px;">
                <div v-for="feed in feeds" :key="feed.title">
                  <v-checkbox
                    v-model="multiple"
                    :multiple="multiple"
                    :label="feed.name"
                    value="feed.name"
                  ></v-checkbox>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </v-layout>
    <!---/Filter--->
    <!--Card--->
    <v-layout row>
      <v-flex v-for="headline in headlines" :key="headline.title" class="mb-6">
        <v-card
          @click="news(headline)"
          :to="{ name: 'HeadlineDetails', params: { headlineDataInfo:headline } }"
          max-width="390"
          height="320"
        >
          <v-img class="white--text align-end" height="200px" v-bind:src="headline.urlToImage"></v-img>

          <v-card-text class="subtitle-2 font-weight-bold text--primary">
            <div>{{ headline.title }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!---/Card--->
  </div>
</template>

<script>
import axios from "axios";

window.axios = require("axios");

export default {
  name: "News",

  components: {},
  data() {
    return {
      headlines: [],
      feeds: [],
      multiple: [],
      dialogm1: "",
      dialog: false
    };
  },

  mounted() {
    //Top Headline
    axios
      .get(
        "http://localhost:8080/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e",
        {
          withCredentials: false,
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/",
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.headlines = response.data.articles;
        console.log(this.headlines);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => (this.loading = false));

    //Source
    axios
      .get(
        "http://localhost:8080/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e",
        {
          withCredentials: false,
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080/",
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.feeds = response.data.sources;
        console.log(this.feeds);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => (this.loading = false));
  },

  methods: {
    news(headlineInfo) {
      localStorage.setItem("data", JSON.stringify(headlineInfo));
    },

    //Search

    search(input) {
      const url = `http://localhost:8080/v2/top-headlines?q=${input}&apiKey=099148be22804e849a0c6fe022b7cf5e`;

      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        }

        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.headlines = data.articles;
            console.log("search", data);
            resolve(data);
          });
      });
    },

    getResultValue(result) {
      console.log("result", result);
      return result.title;
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-left: 0.9rem;
}

.container image {
  vertical-align: middle;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}
</style>


