<template>
  <div @click="$router.push({ name: 'Reader', params: { id: manga.data.id }})" class="container">
    <h2>{{ manga.data.attributes.title.en }}</h2>
    <p>{{ manga.data.attributes.description.en }}</p>
  </div>
</template>

<script>
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
  box-sizing: border-box;
  border: 0.05em solid black;
}
</style>