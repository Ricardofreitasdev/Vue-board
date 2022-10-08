<template>
  <button v-if="show" @click="$emit('onClickButton')" class="button">
    <span>
      <i class="fa-solid fa-plus"></i>
    </span>
    <p>{{ text }}</p>
  </button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    text: String,
    show: Boolean,
  },
  emits: ["onClickButton"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.button {
  display: flex;
  align-items: center;
  background: none;
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 5px;
  transition: $transition;
  border-radius: 4px;
  cursor: pointer;

  span {
    margin-right: 10px;
  }

  &:hover {
    background-color: #dadadb;
  }
}
</style>
