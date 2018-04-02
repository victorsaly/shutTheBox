<template>
        <transition-group class="game-tiles" :duration="300" name="flip-list" tag="div"> 
            <div  v-for="(t, p) in tiles" v-bind:key="t.id">
                <div @click="selectTile(t, p, index)" 
                :class="[t.cssClass,
                {isAvailable : t.isAvailable},
                {isNotAvailable: !t.isAvailable},
                {isTaken : t.isTaken},
                {isCollateral : t.isCollateral},
                {isInUse: t.isInUse},'animated ' + t.action]"  
                class="tile ">
<div class="vertical-center">{{ t.index }}</div> 
                </div>
                
            </div>
        </transition-group> 
 
</template>

<script>
export default {
  props: ["tiles", "index", "allTiles", "clickAudio"],
  computed: {
    diceSum() {
      return this.$store.getters.diceSum;
    },
    sumTilesInUse() {
      return this.$store.getters.sumTilesInUse;
    },
    gameAllowSounds(){
      return this.$store.getters.gameAllowSounds;
    },
  },
  methods: {
    selectTile: function(tile, position, index) {
      if (
        tile.isAvailable &&
        !tile.isTaken &&
        this.sumTilesInUse + tile.index <= this.diceSum
      ) {        
        if (this.clickAudio && this.gameAllowSounds) {
          this.clickAudio.load();
          this.clickAudio.play();
        }

        //get number of rows
        var numberOfRows = this.allTiles.length;
        var forIndexTop = numberOfRows - this.index;
        // debugger;

        if (this.index > 1) {
          //find similar numbers to the top array level
          for (var i = this.index - 1; i > -1; i--) {
            // where i is my new index;
            //console.log(i);
            if (
              this.allTiles[i][position].index == tile.index &&
              !this.allTiles[i][position].isTaken
            ) {
              //console.log("Tile from top array" + i + " is the same");
              this.setTile(this.allTiles[i][position], i);
            } else {
              break;
            }
          }
        } else if (this.index == 1) {
          if (
            this.allTiles[0][position].index == tile.index &&
            !this.allTiles[0][position].isTaken
          ) {
            //console.log("Tile from first level array 0 is the same");
            this.setTile(this.allTiles[0][position], 0);
          }
        }

        //find similar numbers from the lower array level
        for (var i = this.index + 1; i < numberOfRows; i++) {
          if (
            this.allTiles[i][position].index == tile.index &&
            !this.allTiles[i][position].isTaken
          ) {
            //console.log("Tile from bottom array " + (i + 1) + " is the same");
            this.setTile(this.allTiles[i][position], i);
          } else {
            break;
          }
        }
        this.setTile(tile, index);
      } else {
        //Make an animation that it's not available pending....
        this.setTileShake(tile, index);
      }
    },
    async setTileShake(tile, index) {
      // small hack to reset it by removing it before changing the target
      var _tile = Object.assign({}, tile);
      _tile.action = "shake";
      _tile.isCollateral = index != this.index;
      var self = this;
      await this.$store
        .dispatch("setTileByIndex", { tile: _tile, index: index })
        .then(() => {
          setTimeout(() => {
            var _tile = Object.assign({}, tile);
            _tile.action = "";
            this.$store.dispatch("setTileByIndex", {
              tile: _tile,
              index: index
            });
          }, 500);
        });
    },
    async setTile(tile, index) {
      // small hack to reset it by removing it before changing the target
      var _tile = Object.assign({}, tile);
      _tile.action = "rotateIn";
      _tile.isExplosion = true;
      _tile.isInUse = true;
      _tile.isCollateral = index != this.index;
      var self = this;
      await this.$store
        .dispatch("setTileByIndex", { tile: _tile, index: index })
        .then(() => {
          this.$store.dispatch("sumTilesInUse");
          setTimeout(() => {
            var _tile = Object.assign({}, tile);
            _tile.action = "";
            _tile.isExplosion = false;
            this.$store
              .dispatch("setTileByIndex", { tile: _tile, index: index })
              .then(() => {
                self.changeTile(index, tile.id);
              });
          }, 500);
        });
    },
    changeTile: function(tileIndex, id) {
      var self = this;
      self.$store.commit("SET_IS_LOADING", true);
      this.$store
        .dispatch("moveTiles", { tileIndex: tileIndex, id: id })
        .then(() => {
          self.$store.dispatch("setTiles", tileIndex == self.index).then(() => {
            self.$store.commit("SET_IS_LOADING", false);
          });
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.rotateIn {
  -webkit-animation: rotateIn 0.5s; /* Safari 4+ */
  -moz-animation: rotateIn 0.5s; /* Fx 5+ */
  -o-animation: rotateIn 0.5s; /* Opera 12+ */
  animation: rotateIn 0.5s; /* IE 10+, Fx 29+ */
}

/* BOXES */

.blocked span {
  opacity: 0.3;
}

.isTaken {
  color: white !important;
  cursor: not-allowed;
  opacity: 0.3 !important;
  background: #222;
}

.isInUse {
  color: yellow !important;
  cursor: not-allowed;
  background: gray;
  opacity: 0.7;
}

.isCollateral {
  color: greenyellow !important;
  cursor: not-allowed;
  background: gray;
  /* opacity: 0.3; */
}

.isAvailable {
  color: #000;
  -webkit-transition: background 0.2s linear;
  -moz-transition: background 0.2s linear;
  -o-transition: background 0.2s linear;
  transition: background 0.2s linear;
}

.isNotAvailable {
  color: #444 !important;
  opacity: 0.5;
  cursor: not-allowed;
  background: cadetblue;
  -webkit-transition: background 0.3s linear;
  -moz-transition: background 0.3s linear;
  -o-transition: background 0.3s linear;
  transition: background 0.3s linear;
}



</style>