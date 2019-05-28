<template>
  <div class="nav d-flex jc-between">
    <div
      class="nav-item"
      :class="{active: value === index}"
      @click="$emit('input', index)"
      v-for="(item, index) in items"
      :key="index"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  props: ["items", 'value']
};
</script>

