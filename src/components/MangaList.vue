<template>
  <header>
    <div class="row">
      <div class="col">
      <h1>Enter a Manga title:</h1>
      <input
        type="text"
        v-model="mtitle"
        @change="updateList()"
        id="title"
        name="title"
      />
      </div>
    </div>
    <br>
    <template :key="zip[0].data.id" v-for="zip in mangas">
      <div class="row">
        <div class="col"><manga-preview :manga="zip[0]" /></div>
        <div v-if="zip[1] != undefined" class="col">
          <manga-preview :manga="zip[1]" />
        </div>
      </div>
      <br>
    </template>
  </header>
</template>

<script>
import MangaPreview from "./MangaPreview";
import axios from "axios";

const zip = (a, b) =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

export default {
  name: "MangaList",
  components: { MangaPreview },
  data() {
    return {
      logindata: {},
      mangas: [],
    };
  },
  created() {
    this.logindata.username = "Namr2000";
    this.logindata.password = "Mana2eesh!";

    axios.get("https://api.mangadex.org/manga/").then((repsonse) => {
      this.mangas = repsonse.data.results;
      const half = Math.ceil(this.mangas.length / 2);

      const firstHalf = this.mangas.splice(0, half);
      const secondHalf = this.mangas.splice(-half);

      this.mangas = zip(firstHalf, secondHalf);
    });

    /*
    axios.post("https://api.mangadex.org/auth/login", this.logindata).then(
      function (response) {
        console.log("logged in");
      },
      function (rejection) {
        console.log("Rejected!");
      }
    );
    */
  },
  methods: {
    updateList() {
      axios
        .get("https://api.mangadex.org/manga/", {
          params: { title: this.mtitle, limit: 30, contentRating: ["safe"] },
        })
        .then((response) => {
          this.mangas = response.data.results;

          const half = Math.ceil(this.mangas.length / 2);

          const firstHalf = this.mangas.splice(0, half);
          const secondHalf = this.mangas.splice(-half);

          this.mangas = zip(firstHalf, secondHalf);
        });
    },
  },
};
</script>