<template>
  <TopHeader />
  <div class="main">
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/Header.vue";

export default {
  components: {
    TopHeader,
  },
};
</script>

<style lang="scss">
.main {
  height: 90vh;
}
</style>
