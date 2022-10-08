<template>
  <div class="card">
    <span class="card__title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: ["title"],
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
}
</style>
