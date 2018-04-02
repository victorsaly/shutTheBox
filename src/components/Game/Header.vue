<template>
   <div class="header">
      <!-- ICON TOP LEFT -->
        <div class="icon">
            <div class="w-12">
                <router-link to="/"  class="btn bg-green-light">
                     <icon name="user"></icon>
                </router-link>
            </div>
        </div>
        <div class="body">
            <div class="flex-no-grow" style="margin-top:5px">
                <app-number :title="'Play'" v-bind:value="game.numberPlay"/> 
            </div>
            <div class="flex-grow header-logo">
                <img src="../../assets/Logo.png" class="logo" style="width:100%">  
            </div>
            <div class="flex-no-grow" style="margin-top:5px">
               <app-number :title="'Total'" v-bind:value="gameTotal"/> 
            </div>
        </div>
        
        <!-- ICON TOP RIGHT -->
        <div class="icon">        
            <router-link to="/" class="float-right btn bg-red-light">
                <icon name="times"></icon>
            </router-link>
        </div>
    </div>
</template>


<script>
import AnimationNumber from "../Animations/Number";
export default {
  computed: {
    game() {
      return this.$store.getters.game;
    },
    gameLevel() {
      return this.$store.getters.gameLevel;
    },
    gameTotal() {
      return this.$store.getters.sumTilesTaken;
    },
  },
  components: {
    appNumber : AnimationNumber
  }
};
</script>