<template>
  <div class="row">
    <div class="col">
      <page :chapter="chapter" />
    </div>
    <div class="col-md-2 sidebar">
      <chapterSelector :manga="manga" />
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
      chapter: null,
    };
  },
  created() {
    axios
      .get("https://api.mangadex.org/manga/" + this.$route.params.id)
      .then((response) => {
        this.manga = response.data;
      });
  },
};
</script>

<style scoped>
.sidebar {
  margin-right: 1em;
  background-color: darkgrey;
  min-height: 100vh;
  height: 100%;
}
</style>