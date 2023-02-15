<template>
  <div class="checkbox" :id="id">
    <div class="icon">
      <span :class="{ active: done }">
        <i v-show="done" class="fa-solid fa-check"></i>
      </span>
    </div>
    <p :class="{ through: done }">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    done: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.checkbox {
  display: flex;
  width: 100%;
  cursor: pointer;
  background: $bg-light;
  align-items: center;
  border-radius: 4px;

  .icon {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    border-radius: 4px;
    background: $bg-primary;

    span {
      width: 100%;
      height: 100%;
      transition: $transition;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active {
      background: $color-secondary;
      border-radius: 4px;
    }
  }
  .through {
    text-decoration: line-through;
  }
}
</style>
