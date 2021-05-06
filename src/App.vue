<template>
<navbar />
  <img alt="Vue logo" src="./assets/lebanon_ball.jpg" width="80" height="80"/>
  <manga-list />
</template>

<script>
import axios from "axios";
import MangaList from "./components/MangaList";

export default {
  name: "App",
  components: { MangaList },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
