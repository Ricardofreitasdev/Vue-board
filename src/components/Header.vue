<template>
  <header>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
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
}
</style>
