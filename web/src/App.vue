<template>
  <div id="app">
    <div class="py-2 px-3 d-flex bg-dark ai-center jc-between">
      <div class="d-flex">
        <img src="./assets/logo.png" alt height="30">
        <div class="ml-2">
          <div class="text-white">王者荣耀</div>
          <div class="text-secondary">
            <small>团队成就更多</small>
          </div>
        </div>
      </div>
      <button type="button" class="btn bg-primary btn-sm">立即下载</button>
    </div>
    <!-- end of topbar -->

    <div class="pt-3 pb-2 bg-primary">
      <div class="nav is-inverse d-flex jc-around text-white">
        <div class="nav-item active">首页</div>
        <div class="nav-item">攻略中心</div>
        <div class="nav-item">赛事中心</div>
      </div>
    </div>
    <!-- end of nav -->
    <swiper>
      <swiper-slide>
        <img class="w-100" src="./assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="./assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="./assets/images/c9d4249b1872277b3db58ce7ed32e8e4.jpeg">
      </swiper-slide>
    </swiper>
    <!-- end of swiper -->

    <div class="entry-list bg-white mt-3 border-top border-bottom">
      <div class="d-flex flex-wrap pb-3">
        <div class="item mt-3 text-center" style="width: 25%;" v-for="n in 10" :key="n">
          <i class="sprite sprite-board"></i>
          <div class="pt-1">爆料站</div>
        </div>
      </div>
      <div class="bg-light text-center py-2">
        <small>收起</small>
      </div>
    </div>
    <!-- end of nav icons -->

    <!-- <div class="card p-3 bg-white mt-3">
      <div class="card-header d-flex jc-between pb-3 border-bottom">
        <div class="d-flex ai-center card-title">
          o
          <div class="ml-2">阿斯顿发</div>
        </div>
        <div>
          <b>···</b>
        </div>
      </div>
      <div class="card-body pt-3">
        <div class="nav d-flex jc-between">
          <div class="nav-item active">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
        </div>

        <div class="news-list mt-3">
          <div class="py-2 d-flex jc-between" v-for="n in 6" :key="n">
            <div>[公告] | 5月28日全服不停机更新公告</div>
            <small class="text-grey">05/27</small>
          </div>
        </div>
      </div>
    </div>-->
    <card title="新闻资讯">
      
      <tabs v-model="newsCat" :items="['热门', '新闻', '公告', '公告', '公告']"></tabs>
      <div class="news-list mt-2">
        <div class="py-2 d-flex jc-between" v-for="n in 6" :key="n">
          <div>[公告] | 5月28日全服不停机更新公告</div>
          <small class="text-grey">05/27</small>
        </div>
      </div>
    </card>

    <!-- end of news -->
    <card title="英雄列表">
      
    </card>

    <div class="card p-3 bg-white mt-3">
      <div class="card-header pb-3 border-bottom">
        <div class="d-flex d-flex jc-between pb-3">
          <div class="d-flex ai-center card-title">
            o
            <div class="ml-2">英雄列表</div>
          </div>
          <div>
            <b>···</b>
          </div>
        </div>
        <img class="w-100" src="./assets/images/89517772414729.jpg" alt>
      </div>
      <div class="card-body pt-3">
        <div class="nav d-flex jc-between">
          <div class="nav-item active">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
          <div class="nav-item">热门</div>
        </div>

        <div class="hero-list d-flex flex-wrap" style="margin:0.5rem -0.5rem 0 -0.5rem;">
          <div class="hero-item text-center p-2" style="width:20%;" v-for="n in 10" :key="n">
            <img src="./assets/images/106.jpg" class="w-100" alt>
            <div>后羿</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of heroes -->
  </div>
</template>

<script>
import MCard from "./components/Card.vue";
import MNav from "./components/Nav.vue";

export default {
  name: "app",
  components: { Card, Tabs },
  data(){
    return {
      newsCat: 0
    }
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
</style>
