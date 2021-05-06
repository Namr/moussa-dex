<template>
  <header>
    <h1>Enter a Manga title:</h1>
    <input
      type="text"
      v-model="mtitle"
      @change="updateList()"
      id="title"
      name="title"
    />
    <div class="container grid" :key="zip[0].data.id" v-for="zip in mangas">
      <div class="col"><manga-preview :manga="zip[0]" /></div>
      <div v-if="zip[1] != undefined" class="col"><manga-preview :manga="zip[1]" /></div>
    </div>
  </header>
</template>

<script>
import MangaPreview from "./MangaPreview";
import axios from "axios";

const zip = (a, b) => Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);

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

<style scoped>
#list {
  float: right;
}

#search {
  float: left;
}
.container {
  max-width: 940px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 600px) {
  .grid {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .col {
    display: table-cell;
    padding: 1rem;
  }

  .grid-padded {
    margin-left: -1rem;
    margin-right: -1rem;
  }
  .grid-padded .grid {
    border-spacing: 1rem 0;
  }
}

@media (min-width: 600px) {
  .col-1 {
    width: 8.333333%;
  }
  .col-2 {
    width: 16.666667%;
  }
  .col-3 {
    width: 25%;
  }
  .col-4 {
    width: 33.333333%;
  }
  .col-5 {
    width: 41.666667%;
  }
  .col-6 {
    width: 50%;
  }
  .col-7 {
    width: 58.333333%;
  }
  .col-8 {
    width: 66.666667%;
  }
  .col-9 {
    width: 75%;
  }
  .col-10 {
    width: 83.333333%;
  }
  .col-11 {
    width: 91.666667%;
  }
}
</style>