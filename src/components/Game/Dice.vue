<template>

<div class="dice">
      <!-- ICON TOP LEFT -->
        <div class="w-1/6">
            <div class="w-12">
                
            </div>
        </div>
        <div class="w-2/3 flex">
            <div class="flex-no-grow">
                 <app-number :title="'Bonus'" v-bind:value="gameBonus"/>
            </div>
            <div class="flex-grow " style="margin-top:-10px; position:relative" unselectable="on" :class="[{blocked: game.diceInUse || (!game.state == 'isStart' && game.state == 'isNext')}]">
                 <div v-if="game.state==''" class="diceSumUp" >{{diceSum}}</div>
                 <app-dice v-for="dice in game.dice"  :value="dice.number" :key="dice.id"/>
                 <div class="diceSumUpLeft" v-if="sumTilesInUse != diceSum && (diceSum - sumTilesInUse) != diceSum" >{{diceSum - sumTilesInUse}}</div>
            </div>
            <div class="flex-no-grow">
                <app-number :title="'Points'" v-bind:value="gamePoints"/>
            </div>
        </div>
        
        <!-- ICON TOP RIGHT -->
        <div class="w-1/6">        
            <div class="w-12">
                
            </div>
        </div>
</div>

</template>

<script>
import Dice from "../Animations/Dice";
import AnimationNumber from "../Animations/Number";
export default {
  computed: {
    game() {
      return this.$store.getters.game;
    },
    diceSum() {
      return this.$store.getters.diceSum;
    },
    sumTilesInUse(){
      return this.$store.getters.sumTilesInUse;
    },
    gameBonus() {
      return this.$store.getters.gameBonus;
    },
    gamePoints() {
      return this.$store.getters.gamePoints;
    }
  },
  components: {
    appDice: Dice,
    appNumber: AnimationNumber
  }
};
</script>