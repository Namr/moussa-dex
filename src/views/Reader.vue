<template>
  <div class="row sidebar">
    <div class="col rightbtn">
      <button @click="updatePage(-1)">Previous Page</button>
    </div>
    <div class="col">
      <chapterSelector @chapterSelected="updateChapter" :manga="manga" :page="page + 1 " :lastPage="lastPage"/>
    </div>
    <div class="col leftbtn">
      <button @click="updatePage(1)">Next Page</button>
    </div>
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
      lastPage: 0,
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
      this.page = 0;
      this.lastPage = this.schapter.data.attributes.data.length;
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
  background-color: darkgrey;
}

.rightbtn {
  float: left;
  margin-top: 5px;
}

.leftbtn {
  float: right;
  margin-top: 5px;
}
</style>