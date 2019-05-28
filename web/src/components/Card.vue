<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex jc-between pb-3 border-bottom">
      <div class="d-flex ai-center card-title">
        o
        <div class="ml-2">{{title}}</div>
      </div>
      <div>
        <b>···</b>
      </div>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["icon", "title", "to"]
};
</script>
