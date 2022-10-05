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
  margin: 10px 0;
  text-align: left;

  &__title {
    font-size: 12px;
  }
}
</style>
