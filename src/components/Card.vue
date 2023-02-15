<template>
  <div class="card">
    <span class="card__title">
      {{ modelCard.title }}
    </span>
    <div class="card__status" v-if="modelCard.taskLength()">
      <ProgressBar
        :total="modelCard.taskLength()"
        :done="modelCard.tasksDone()"
      />
    </div>
    <small style="font-size: 10px" class="card__status" v-else
      >cadastre uma task para exibir o progresso</small
    >
  </div>
</template>

<script>
import ModelCard from "@/models/card";
import ProgressBar from "./ProgressBar.vue";
export default {
  name: "CardComponent",
  props: ["card"],
  components: { ProgressBar },
  computed: {
    modelCard() {
      return new ModelCard(
        this.card.listID,
        this.card.title,
        this.card.task,
        this.card.id,
        this.card.description
      );
    },
  },
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
  border: 1px solid transparent;
  transition: $transition;

  &:hover,
  &:focus {
    border: 1px solid $color-secondary;
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
