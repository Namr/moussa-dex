<template>
  <navbar />
  <manga-list />
</template>

<script>
import axios from "axios";
import MangaList from "./components/MangaList";
import Navbar from "./components/Navbar"

export default {
  name: "App",
  components: { MangaList, Navbar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
