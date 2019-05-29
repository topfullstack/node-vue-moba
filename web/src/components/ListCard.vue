<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header  pb-3 border-bottom">
      <div class="d-flex jc-between">
        <div class="d-flex ai-center card-title">
          o
          <div class="ml-2">{{title}}</div>
        </div>
        <div>
          <b>···</b>
        </div>
      </div>

      <div>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="card-body pt-3">
      <div class="nav d-flex jc-between">
        <div
          class="nav-item"
          :class="{active: active === index}"
          @click="active = index; $refs.swiper.swiper.slideTo(index) "
          v-for="(category, index) in categories"
          :key="index"
        >{{category.name}}</div>
      </div>
      <swiper ref="swiper" @slide-change="active = $refs.swiper.swiper.realIndex">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <slot name="list" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import NavMenu from "./NavMenu.vue";
export default {
  props: ["categories", "title", "icon", "to", "value"],
  components: { Card, NavMenu },
  data() {
    return {
      // cats: [{ name: "热门" }, { name: "新闻" }, { name: "公告" }],
      active: 0
    };
  }
};
</script>
