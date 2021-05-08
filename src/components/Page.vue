<template>
  <h1 v-if="iurl == '' ">Loading</h1>
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
          this.iurl =
            this.baseurl +
            "/data/" +
            newVal.data.attributes.hash +
            "/" +
            newVal.data.attributes.data[this.page];
        });
    },
    page: function (newVal, oldVal) {
      if (newVal >= 0 && newVal < this.chapter.data.attributes.data.length) {
        this.iurl =
          this.baseurl +
          "/data/" +
          this.chapter.data.attributes.hash +
          "/" +
          this.chapter.data.attributes.data[newVal];
      }
    },
  },
};
</script>