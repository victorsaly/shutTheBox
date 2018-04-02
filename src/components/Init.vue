<template>
  <div class="init">
    <div class="mb-4">
      <img src="../assets/Logo.png" class="logo"> 
      <span class="version">v{{version}}</span>
    </div>
    <div class="mb-1">
         <button class="btn bg-teal-dark hover:bg-teal-dark" @click="setGame(1, false, 1)">Beginner</button>         
    </div>
    <div class="mb-1">
        <button class="btn bg-blue hover:bg-blue-dark" @click="setGame(9, true, 2)">Medium</button>
    </div>
    <div class="mb-1">
        <button class="btn bg-red-dark hover:bg-red-darkest" @click="setGame(9, false, 3)">Ninja</button>
    </div>
    <div>
      <button class="btn bg-yellow-dark hover:bg-yellow-darkest" @click="alert('work in progress')">Top Scores<icon name="star-o"></icon></button>
    </div>
  </div>
</template>

<script>
import { version } from "../../package.json";
export default {
  name: "app",
  data: function() {
    return {
      version: version
    };
  },
  methods: {
    setGame(size, bool, level) {
      // this.$store.dispatch("initTiles", {
      //   size: size || 1,
      //   isRandom: bool || false
      // });
      // this.$store.dispatch("restartGame");
      // this.$store.commit("SET_GAME_IS_VISIBLE", true);
      this.$router.push({
        name: "Game",
        params: { level: level || 1, size: size, bool: bool }
      });
    }
  },
  mounted() {
    window.addToHomescreen({
      maxDisplayCount: 1,
      displayPace: 0,
      skipFirstVisit: false
    });
  }
};
</script>

