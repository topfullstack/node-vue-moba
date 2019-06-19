<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu" v-if="to"></i>
    </div>
    <div class="card-body" :class="{'border-top': !clean}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    to: {},
    clean: { type: Boolean }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    
  }
  
  border-bottom: 1px solid $border-color;
}
</style>
