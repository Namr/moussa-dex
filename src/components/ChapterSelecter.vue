<template>
  <br />
  <h2>Chapter:</h2>
  <select name="Select Chapter" id="selchapter">
    <template v-for="chapter in chapters" :key="chapter.data.id">
      <option @click='$emit("chapter-selected", chapter)'>{{ chapter.data.attributes.title }}</option>
    </template>
  </select>
</template>


<script>
import axios from "axios";

export default {
  name: "ChapterSelector",
  components: {},
  data() {
    return {
      chapters: [],
    };
  },
  props: {
    manga: Object,
  },
  created() {},
  watch: {
    manga: function (newVal, oldVal) {
      var tempchapters = newVal.relationships.filter(
        (relation) => relation.type === "chapter"
      );

      for (var chapter in tempchapters) {
        axios
          .get("https://api.mangadex.org/chapter/" + tempchapters[chapter].id)
          .then((response) => {
            this.chapters.push(response.data);
          });
      }
    },
  },
};
</script>