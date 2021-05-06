<template>
  <div class="container">
    <h2>{{ manga.data.attributes.title.en }}</h2>
    <p>{{ manga.data.attributes.description.en }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MangaPreview",
  props: {
    manga: Object,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped>
.container {
    display: table-cell;
  box-sizing: border-box;
  width: 30%;
  border: 1px solid black;
}
</style>