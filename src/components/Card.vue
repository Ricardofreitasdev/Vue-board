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
@import "@/assets/styles/variables.scss";

.card {
  padding: 10px;
  width: 100%;
  background: $bg-light;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  border: 2px solid transparent;
  transition: $transition;

  &:hover {
    border: 2px solid $bg-light;
  }

  &__title {
    font-size: 12px;
    margin-bottom: 5px;
    display: flex;
  }

  &__status {
    p {
      font-size: 10px;
    }
  }
}
</style>
