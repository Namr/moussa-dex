<template>
  <div class="row sidebar">
    <div class="col-md-4"> </div>
    <div class="col">
      <button @click="updatePage(-1)">Previous Page</button>
    </div>
    <div class="col">
      <chapterSelector @chapter-selected="updateChapter" :manga="manga" />
    </div>
    <div class="col">
      <button @click="updatePage(1)">Next Page</button>
    </div>
    <div class="col-md-4"> </div>
  </div>
  <div class="row">
    <div class="col">
      <page :chapter="schapter" :page="page" />
    </div>
  </div>
</template>

<script>
import Page from "../components/Page";
import ChapterSelector from "../components/ChapterSelecter";

import axios from "axios";
import ChapterSelecter from "../components/ChapterSelecter.vue";
export default {
  name: "Reader",
  components: { Page, ChapterSelector },
  data() {
    return {
      manga: null,
      schapter: null,
      page: 0,
    };
  },
  created() {
    axios
      .get("https://api.mangadex.org/manga/" + this.$route.params.id)
      .then((response) => {
        this.manga = response.data;
      });
  },
  methods: {
    updateChapter(value) {
      this.schapter = value;
    },
    updatePage(value) {
      var temp = this.page;
      temp += value;
      if (temp >= 0 && temp < this.schapter.data.attributes.data.length) {
        this.page = temp;
      }
    }
  },
};
</script>

<style scoped>
.sidebar {
  margin-right: 1em;
  background-color: darkgrey;
}
</style>