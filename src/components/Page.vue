<template>
  <h1 v-if="iurl == ''">Loading</h1>
  <img :src="iurl" style="max-width: 80%; height: auto" />
</template>


<script>
import axios from "axios";

export default {
  name: "Reader",
  components: {},
  data() {
    return {
      iurl: "",
      baseurl: "",
    };
  },
  props: {
    chapter: Object,
    page: Number,
  },
  created() {},
  watch: {
    chapter: function (newVal, oldVal) {
      axios
        .get("https://api.mangadex.org/at-home/server/" + newVal.data.id)
        .then((response) => {
          this.baseurl = response.data.baseUrl;
          this.iurl = this.getChapterURL(this.page);

          this.preloadPages(this.page);
        });
    },
    page: function (newVal, oldVal) {
      if (newVal >= 0 && newVal < this.chapter.data.attributes.data.length) {
        this.iurl = this.getChapterURL(newVal);
      }
    },
  },
  methods: {
    getChapterURL(page) {
      var str =
        this.baseurl +
        "/data/" +
        this.chapter.data.attributes.hash +
        "/" +
        this.chapter.data.attributes.data[page];

      return str;
    },
    preloadPages(page) {
      var img = new Image();

      img.onload = () => {
        if(page < this.chapter.data.attributes.data.length) {
          this.preloadPages(page + 1);
        }
      }

      img.src = this.getChapterURL(page);
    }
  },
};
</script>