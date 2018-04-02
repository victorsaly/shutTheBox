<template>
<span  v-html="diceHtml"></span> 
</template>
<script>
import TWEEN from "tween";
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed:{
    diceHtml(){
      return "&#x268" + (Math.abs((this.tweeningValue - 1)) < 0 ? 0 : Math.abs((this.tweeningValue - 1)));
    }
  },
  data: function() {
    return {
      tweeningValue: 0,
      isFinished: false
    };
  },
  watch: {
    value: function(newValue, oldValue) {
      this.tween(oldValue, newValue);
    }
  },
  mounted: function() {
    this.tween(0, this.value);
  },
  methods: {
    tween: function(startValue, endValue) {
      var vm = this;
      this.isFinished = false;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      let t = new TWEEN.Tween({
        tweeningValue: startValue
      })
        .to(
          {
            tweeningValue: endValue
          },
          300
        )
        .onUpdate(function() {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();
      animate();
      let self = this;
      t.onComplete(function() {
        self.isFinished = true;      
      });
    }
  }
};
</script>
<style scoped>
span {
  font-size: 55px;
}
</style>
