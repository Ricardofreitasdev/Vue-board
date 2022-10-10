<template>
  <div class="progress">
    <span>{{ progressPercentage.toFixed(0) }} %</span>
    <div class="progress__bar">
      <div class="progress__bar--progress" :style="getStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    total: Number,
    done: Number,
  },
  computed: {
    getStyle() {
      return {
        height: "100%",
        background: this.progressPercentage === 100 ? "#00e700" : "#2196f3",
        width: this.progressPercentage + "%",
        position: "absolute",
        transitionDuration: "0.14s",
        transitionTimingFunction: "ease-in",
      };
    },
    progressPercentage() {
      const parts = 100 / this.total;
      const total = parts * this.done;

      if (isNaN(total)) {
        return 0;
      }

      return total;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;

  span {
    width: 35px;
    font-size: 10px;
  }
  &__bar {
    width: 100%;
    height: 5px;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
  }
}
</style>
