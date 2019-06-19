<template>
  <div class="page-article" v-if="model">
    <top-nav></top-nav>
    <div class="d-flex border-bottom py-3 px-2">
      <div class="iconfont icon-Back text-success" @click="$router.go(-1)"></div>
      <strong class="flex-1 fs-lg pl-2 text-blue">{{model.title}}</strong>
      <span class="fs-sm text-grey">{{model.createdAt | date('YYYY-MM-DD')}}</span>
    </div>

    <div class="px-4 py-2 fs-lg" v-html="model.body"></div>

    <div class="border-top py-2 px-4" style="border-top-width: 5px;">
      <div class="py-2">
        <strong class="text-blue">相关资讯</strong>
      </div>
      <router-link
        class="py-2"
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in model.related"
        :key="item._id"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: 'fetch'
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>