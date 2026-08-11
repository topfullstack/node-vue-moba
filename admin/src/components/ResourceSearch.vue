<template>
  <div class="resource-search">
    <el-input
      :value="value"
      placeholder="输入关键词搜索"
      maxlength="100"
      clearable
      @input="$emit('input', $event)"
      @clear="submit('')"
      @keyup.enter.native="submit(value)"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="submit(value)"
      >搜索</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    submit(value) {
      this.$emit("search", String(value || "").trim());
    }
  }
};
</script>

<style scoped>
.resource-search {
  max-width: 420px;
  margin-bottom: 1rem;
}
</style>
