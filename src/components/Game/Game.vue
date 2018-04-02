<template>
  <div id="Game">
    <app-header/>
    <div class="game-body">
      <div class="vertical-center">
        <app-tiles v-for="(tiles, index) in tilesObj" :index="index" :allTiles="tilesObj" :tiles="tiles" :clickAudio="clickAudio" :key="tiles.index"/>
      </div>
    </div>
    <app-dice/>
    <app-footer/>
  </div>
</template>
<script>
import "@/assets/styles/main.css";
import Header from "./Header"
import Footer from "./Footer"
import Dice from "./Dice"
import Tiles from "./Tiles"
export default {
  name: "Game",
  props: {
    size: {
      type: Number,
      default: '1'
    },
    bool:{
      type: Boolean,
      default: false
    }
  },
  props: ['size', 'bool'],
  computed:{
    tilesObj() {
      return this.$store.getters.tiles == null ? {} : this.$store.getters.tiles;
    }
  },
  components:{
      appHeader:Header,
      appFooter:Footer,
      appDice:Dice,
      appTiles:Tiles
  },
  created(){

    this.clickAudio  = new Audio(document.querySelector('#click').src);

    if (!this.$route.params.level){
      this.$router.push({ path: 'init' });
    }else{
      this.$store.dispatch("initTiles", {
         size: this.size,
         isRandom: this.bool
       });
      this.$store.dispatch("restartGame");
      this.$store.commit("SET_GAME_IS_VISIBLE", true);
    }
  }
};
</script>


