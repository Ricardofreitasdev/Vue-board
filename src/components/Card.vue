<template>
  <div class="card">
    <span class="card__title">
      {{ card.title }}
    </span>
    <div class="card__status">
      <ProgressBar :total="card.taskLength()" :done="card.tasksDone()" />
    </div>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";
export default {
  name: "CardComponent",
  props: ["card"],
  components: { ProgressBar },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 5px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;

  &__title {
    font-size: 12px;
  }

  &__status {
    p {
      font-size: 10px;
    }
  }
}
</style>
