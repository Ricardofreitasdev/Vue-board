<template>
  <header>
    <h1>Vue Board</h1>
  </header>
</template>

<script>
export default {
  name: "TopHeader",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

header {
  height: 10vh;
  width: 100%;
  background-color: $bg-secondary;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: $color-secondary;
    font-size: 20px;
  }
}
</style>
