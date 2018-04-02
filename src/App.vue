<template>
  <div :class="[{isDesktop : !isMobile}, {isMobile : isMobile && tilesLength > 1}, {shutTheBox : tilesLength == 1},{'container' : !isMobile}]" id="app">
    <div class="router">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <div class="warning">
      <horizontal-warning/>
    </div>
  </div>
</template>
<script>
import "@/assets/styles/main.css";
import HorizontalWarning from './components/Warnings/Horizontal'
import $ from "./services/gameServices";
export default {
  name: "App",
   data: function() {
    return {
      isMobile: false
    };
  },
  components:{
      horizontalWarning:HorizontalWarning
  },
  computed: {
     tilesLength() {
       return this.$store.getters.tiles == null
         ? 0
         : this.$store.getters.tiles.length;
     }
  },
  created() {
    this.$store.dispatch("initGame");
    this.isMobile = $.isMobile();
  }
};
</script>


