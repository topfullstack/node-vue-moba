<template>
  <div class="article-detail">
    <div class="d-flex">
      <h4>{{model.title}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data(){
    return {
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch();
  }
};
</script>