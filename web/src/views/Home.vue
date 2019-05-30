<template>
  <div>
    <!-- end of nav -->
    <swiper :options="{pagination: {el: '.pagination-main'}}">
      <swiper-slide>
        <img class="w-100" src="@/assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="@/assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>

      <div class="swiper-pagination pagination-main text-right p-2 px-3" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="entry-list bg-white mt-3 border-top border-bottom">
      <div class="d-flex flex-wrap pb-3 ov-hidden" :style="{height: entryHeight}">
        <div class="item mt-3 text-center text-info" style="width: 25%;" v-for="n in 10" :key="n">
          <i class="sprite sprite-board"></i>
          <div class="pt-1">爆料站</div>
        </div>
      </div>
      <div class="bg-light text-center py-2" 
      @click="entryHeight = (entryHeight === '5rem') ? 'auto' : '5rem'">
        <small> {{entryHeight === '5rem' ? '展开' : '收起'}}</small>
      </div>
    </div>
    <!-- end of nav icons -->

    <list-card title="新闻列表" :categories="newsLists">
      <template #list="{category, index}">
        <div class="mt-2">
          <router-link  class="py-2 d-flex jc-between" 
           tag="div" :to="{name: 'article-detail', params: {id: item._id}}"
          v-for="(item,i) in category.latestNews" :key="i">
            <div class="text-ellipse">
            <span class="text-info">[{{item.categoryName || category.name}}]</span>
             | {{item.title}}</div>
            <small class="text-grey">{{item.createdAt | shortDate('/')}}</small>
          </router-link>
        </div>
      </template>
    </list-card>

    <!-- end of news -->

    <list-card title="英雄列表" :categories="newsLists">
      <template #header>
        <img class="w-100 mt-3" src="@/assets/images/89517772414729.jpg" alt>
      </template>
      <template #list="{category, index}">
        <div class="d-flex flex-wrap" style="margin:0.5rem -0.5rem 0 -0.5rem;">
          <div
            class="text-center p-2"
            style="width:20%;"
            v-for="(item,i) in category.latestNews"
            :key="i"
          >
            <img src="@/assets/images/106.jpg" class="w-100" alt>
            <div>后羿</div>
          </div>
        </div>
      </template>
    </list-card>
    <!-- end of heroes -->

    <list-card title="精彩视频" :categories="newsLists">
      <template #list="{category, index}">
        <div class="d-flex flex-wrap" style="margin:0.5rem -0.5rem 0 -0.5rem;">
          <div class="p-2" style="width:50%;" v-for="(item,i) in category.latestNews" :key="i">
            <img src="@/assets/images/106.jpg" class="w-100" height="100" alt>
            <div class>{{item.title.substr(0, 25)}}</div>
            <div class="d-flex jc-between text-secondary fs-sm">
              <div>- 27.4万</div>
              <div>{{item.createdAt | shortDate}}</div>
            </div>
          </div>
        </div>
      </template>
    </list-card>

    <list-card title="图文攻略" :categories="newsLists">
      <template #list="{category, index}">
        <div class="d-flex flex-wrap" style="margin:0.5rem -0.5rem 0 -0.5rem;">
          <div class="d-flex p-2 jc-between" v-for="(item,i) in category.latestNews" :key="i">
            <img src="@/assets/images/106.jpg" style="width:10em;" height="82" alt>
            <div class="h-100 d-flex flex-column pl-2 flex-1">
              <div class="">{{item.title.substr(0, 25)}}</div>
              <div class="flex-1 text-secondary fs-sm py-1">{{item.title.substr(0, 25)}}</div>
              <div class="fs-sm text-grey">{{item.createdAt | shortDate}}</div>
            </div>
          </div>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>

import ListCard from "@/components/ListCard.vue";

export default {
  name: "app",
  components: { ListCard },
  data() {
    return {
      entryHeight: '5rem',
      newsLists: []
    };
  },
  methods: {
    async fetchNewsLists() {
      const res = await this.$http.get("lists/news");
      this.newsLists = res.data.children;
    }
  },
  created() {
    this.fetchNewsLists();
  }
};
</script>

<style lang="scss">
.entry-list {
  .item {
    border-left: 1px solid #d4d9de;
    &:nth-child(4n + 1) {
      border: none;
    }
  }
}
.pagination-main {
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
    border-radius: 2px;
    &.swiper-pagination-bullet-active {
      background: #4b67af;
    }
  }
}
</style>
