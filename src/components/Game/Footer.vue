<template>
   <div class="footer">
      <!-- ICON TOP LEFT -->
        <div class="w-1/6">
             <a class="btn bg-blue-light" href="#">
                 <icon name="refresh"></icon>
             </a>
        </div>
        <div class="w-2/3 text-center">
             <div class="footer-btn">
                 <button class="button animated" unselectable="on" v-bind:key="game.state" v-if="buttonGameStateMessage"
                  @click.prevent.stop.once="gameState" 
                 :class="[{'shake': game.state =='isOver'}, {'fadeIn': game.state !='isOver' }, buttonGameStateColour]">
                     <div class="icon">
                        <icon v-if="!gameIsLoading" :name="buttonGameStateIcon"/>
                        <icon v-else spin :name="buttonGameStateIcon"/>
                    </div>
                    <div class="body">
                        {{buttonGameStateMessage}}
                    </div>
                 </button>
                 <template v-else>
                    <selected-tiles :diceSumUp="diceSum" :tiles="selectedTilesObj"/>
                 </template>
             </div>
        </div>
        <!-- ICON TOP RIGHT -->
        <div class="w-1/6">
            <a class="float-right btn bg-yellow-light" href="#" @click="toogleSound">
                <icon :name="volumeIcon"></icon>
            </a>
        </div>
    </div>
</template>

<script>
import $ from "../../services/gameServices";
import SelectedTiles from "./SelectedTiles"
export default {
  computed: {
    windowHeight(){
      return window.innerHeight;
    },
    selectedTilesObj(){
      return _.filter(_.flatten(this.$store.getters.tiles), function(t) {
        return t.isInUse == true && t.isCollateral == false;
      });
    },
    diceSum(){
      return _.sum(_.filter(this.game.dice, function (t) {
                return (t.isAvailable == true)
            }).map(function (t) { return t.number }))
    },
    gameAllowSounds(){
      return this.$store.getters.gameAllowSounds;
    },
    game() {
      return this.$store.getters.game;
    },
    gameIsLoading() {
      return this.$store.getters.gameIsLoading;
    },
    volumeIcon(){
      return this.gameAllowSounds ? "volume-up":"volume-down";
    },
    buttonGameStateMessage() {
      switch (this.game.state) {
        case "isNext":
          return "ROLL DICE";
        case "isOver":
          return "GAME OVER";
        case "isStart":
          return "START GAME";
        case "isWin":
          return "SHUT THE BOX";
      }
    },
    buttonGameStateColour() {
      switch (this.game.state) {
        case "isNext":
        case "isWin":
        case "isStart":
          return "bg-green-light hover:bg-green-dark";
        case "isOver":
          return "bg-red-light hover:bg-red-lighter";
      }
    },
    buttonGameStateIcon() {
      if (this.gameIsLoading) {
        return "refresh";
      } else {
        switch (this.game.state) {
          //
          case "isNext":
            return "arrow-right";
          case "isOver":
            return "times";
          case "isStart":
            return "arrow-right";
          case "isWin":
            return "check";
        }
      }
    }
  },
  methods:{
    gameState() {
      if (!this.gameIsLoading) {
        this.gameAction();
      }
    },
    toogleSound(){
      this.$store.dispatch("toogleSound");
    },
    gameAction() {
      this.$store.commit("SET_IS_LOADING", true);
       setTimeout(() => {
            switch (this.game.state) {
               case "isNext":
                 this.initNextGame();
                 break;
               case "isOver":
                 this.restartGame(true);
                 break;
               case "isStart":
                 this.initStartGame();
                 break;
               case "isWin":
                 this.restartGame(true);
                 break;
             }
          }, 100);
        
    },
    initStartGame() {
      let self = this;
      self.$store.dispatch("startGame").then(() => {
        self.$store.dispatch("setTiles", true).then(() => {
          self.$store.commit("SET_IS_LOADING", false);
        });
      });
    },
    initNextGame() {
      let self = this;
      self.$store.dispatch("nextGame").then(() => {
        self.$store.dispatch("setTiles", true).then(() => {
          self.$store.commit("SET_IS_LOADING", false);
        });
      });
    },
    restartGame(status) {
      this.$store.dispatch("restartGame", status);
    }
  },
  components:{
    selectedTiles:SelectedTiles
  }
};
</script>