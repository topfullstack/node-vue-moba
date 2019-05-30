<template>
  <div>
    <top-bar></top-bar>
    <top-nav></top-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import TopNav from '@/components/TopNav.vue'
export default {
  components: { TopBar, TopNav },
};
</script>

<style>
</style>
