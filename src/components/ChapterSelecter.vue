<template>
  <br />
  <h2>Chapter:</h2>
  <select
    name="Select Chapter"
    id="selchapter"
    v-model="selected"
    @change="SelectChapter($event)"
  >
    <option :value="'Choose Chapter'">Choose Chapter</option>
    <template v-for="chapter in chapters" :key="chapter.data.id">
      <option :value="chapter.data.id">
        {{ chapter.data.attributes.title }}
      </option>
    </template>
  </select>
  <p>Page {{ page }} / {{ lastPage }}</p>
</template>


<script>
import axios from "axios";

export default {
  name: "ChapterSelector",
  components: {},
  data() {
    return {
      chapters: [],
      selected: "Choose Chapter",
      selectedIndex: 0,
    };
  },
  props: {
    manga: Object,
    page: Number,
    lastPage: Number,
  },
  created() {},
  methods: {
    AppendList(offsett) {
      axios
        .get("https://api.mangadex.org/chapter", {
          params: {
            limit: 100,
            offset: offsett,
            translatedLanguage: ["en"],
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
            this.selected = this.chapters[0].data.id;
            return;
          }
        });
    },
    SelectChapter(event) {
      for (var c in this.chapters) {
        if (this.chapters[c].data.id == event.target.value) {
          this.$emit("chapterSelected", this.chapters[c]);
          this.selected = this.chapters[c].data.id;
          this.selectedIndex = c;
        }
      }
    },
  },
  watch: {
    manga: function (newVal, oldVal) {
      this.chapters = [];
      this.AppendList(0);
    },
    page: function (newVal, oldVal) {
      if (newVal < 1 && this.selectedIndex > 0) {
        var c = this.selectedIndex - 1;
        this.$emit("chapterSelected", this.chapters[c]);
        this.selected = this.chapters[c].data.id;
        this.selectedIndex = c;

        //we should be on the last page of this chapter
        this.$emit("setPage", this.chapters[c].data.attributes.data.length - 1);
      } else if (
        newVal > this.lastPage &&
        this.selectedIndex < this.chapters.length
      ) {
        var c = this.selectedIndex + 1;
        this.$emit("chapterSelected", this.chapters[c]);
        this.selected = this.chapters[c].data.id;
        this.selectedIndex = c;
      } else if (newVal < 1 || newVal > this.lastPage) {
        this.$emit("setPage", oldVal);
      }
    },
  },
  emits: ["chapterSelected", "setPage"],
};
</script>