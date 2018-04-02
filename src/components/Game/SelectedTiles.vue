<template>
    <div>
        <transition-group v-if="tiles.length > 0" class="game-tiles" :duration="300" name="flip-list" tag="div"> 
             
            <div  v-for="t in tiles" v-bind:key="t.id">
                <div
                :class="[t.cssClass,'animated flip']"  
                class="selectedTile">
                    <div class="vertical-center">{{ t.index }}</div> 
                </div>
            </div>
           
        </transition-group>
        <template v-else>
            <div class="mt-4">
                 Select tiles that sum up <b>{{ diceSumUp }}</b>
            </div>
        </template>
    </div>
</template>
<script>
export default {
  props: ["tiles", "diceSumUp"],
  computed:{
    tileSum(){
      return _.sum(this.tiles.map(function (t) { return t.index }))
    }
  }
};
</script>
<style scoped>

.animated {
   -webkit-animation-duration: 0.3s;
   animation-duration: 0.3s;
   -webkit-animation-fill-mode: both;
   animation-fill-mode: both;
}
</style>