<template>
  <br/>
  <h2>Chapter:</h2>
  <select name="Select Chapter" id="selchapter">
    <template v-for="chapter in chapters" :key="chapter.id">
      <option>{{ chapter.id }}</option>
    </template>
  </select>
</template>


<script>
export default {
  name: "ChapterSelector",
  components: {},
  data() {
    return {
      chapters: null,
    };
  },
  props: {
    manga: Object,
  },
  created() {},
  watch: {
    manga: function (newVal, oldVal) {
      this.chapters = newVal.relationships.filter(
        (relation) => relation.type === "chapter"
      );
    },
  },
};
</script>