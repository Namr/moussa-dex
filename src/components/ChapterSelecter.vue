<template>
  <br />
  <h2>Chapter:</h2>
  <select name="Select Chapter" id="selchapter" @change="SelectChapter($event)">
    <option :selected="true">Choose Chapter</option>
    <template v-for="chapter in chapters" :key="chapter.data.id">
      <option :value="chapter.data.id">
        {{ chapter.data.attributes.title }}
      </option>
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
  methods: {
    AppendList(offsett) {
      axios
        .get("https://api.mangadex.org/chapter", {
          params: {
            limit: 100,
            offset: offsett,
            translatedLanguage: "en",
            manga: this.manga.data.id,
          },
        })
        .then((response) => {
          this.chapters = this.chapters.concat(response.data.results);

          if (response.data.results.length > 99) {
            this.AppendList(offsett + 100);
          } else {
            this.chapters.sort((a, b) =>
              Number(a.data.attributes.chapter) >
              Number(b.data.attributes.chapter)
                ? 1
                : -1
            );
            this.$emit("chapterSelected", this.chapters[0]);
            return;
          }
        });
    },
    SelectChapter(event) {
      for (var c in this.chapters) {
        if (this.chapters[c].data.id == event.target.value) {
          this.$emit("chapterSelected", this.chapters[c]);
        }
      }
    },
  },
  watch: {
    manga: function (newVal, oldVal) {
      this.chapters = [];
      this.AppendList(0);
    },
  },
  emits: ["chapterSelected"],
};
</script>