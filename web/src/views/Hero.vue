<template>
  <div class="page-hero" v-if="model">
    <div class="topbar text-white bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-3">攻略站</span>
      </div>

      <span>更多英雄 &gt;</span>
    </div>
    <div
      class="top d-flex flex-column jc-end"
      :style="{'background-image': `url(${model.banner})`}"
    >
      <div class="h-100 info text-white p-3 fs-sm">
        <div>{{model.title}}</div>
        <h2 class="m-0 py-2">{{model.name}}</h2>
        <div>{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between" v-if="model.scores">
          <div class="scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-info">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-grey-1">{{model.scores.survive}}</span>
          </div>
          <div class="text-grey d-flex ai-center">
            <span>皮肤： 2 &gt;</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end of top -->

    <div class>
      <div class="px-3 bg-white">
        <div class="nav jc-around py-3 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>

      <swiper>
        <swiper-slide>
          <div class="d-flex text-center p-3 bg-white">
            <div class="btn bg-light btn-lg flex-1 fs-xl">
              <i class="iconfont icon-card-hero text-primary mr-1"></i>
              英雄介绍视频
            </div>
            <div class="btn bg-light btn-lg flex-1 ml-2">
              <i class="iconfont icon-card-hero"></i>
              英雄介绍视频
            </div>
          </div>

          <div class="skills bg-white px-3 border-bottom">
            <div class="d-flex jc-around py-4">
              <img
                v-for="(item, i) in model.skills"
                :key="item.name"
                :src="item.icon"
                class="skill-icon"
                :class="{active: currentSkillIndex === i}"
                @click="currentSkillIndex = i"
              >
            </div>
            <div class="border-bottom">
              <div>
                <strong class="fs-lg">{{skill.name}}</strong>
                <span class="text-grey-1 ml-3 fs-sm">(冷却值：{{skill.delay}} 消耗：{{skill.cost}})</span>
              </div>

              <p>{{skill.description}}</p>
            </div>
            <p class="text-grey">小提示：{{skill.tips}}</p>
          </div>

          <m-card icon="menu1" title="出装推荐" clean>
            <div>顺风出装</div>
            <div class="d-flex jc-between text-center py-3">
              <div v-for="item in model.items1" :key="item.name">
                <img :src="item.icon" width="45" class="circle">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>
            <div class="border-top pt-3">逆风出装</div>
            <div class="d-flex jc-between text-center py-3">
              <div v-for="item in model.items2" :key="item.name">
                <img :src="item.icon" width="45" class="circle">
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>
          </m-card>

          <m-card icon="menu1" title="使用技巧" clean>
            <p class="mt-0">{{model.usageTips}}</p>
          </m-card>
          <m-card icon="menu1" title="对抗技巧" clean>
            <p class="mt-0">{{model.battleTips}}</p>
          </m-card>
          <m-card icon="menu1" title="团战思路" clean>
            <p class="mt-0">{{model.teamTips}}</p>
          </m-card>
          <m-card icon="menu1" title="英雄关系" clean>
            <div>最佳搭档</div>
            <div>
              <div class="d-flex pt-3" v-for="item in model.partners" :key="item.hero.name">
                <img :src="item.hero.avatar" alt width="50" height="50">
                <p class="flex-1 m-0 pl-3">{{item.description}}</p>
              </div>
            </div>
          </m-card>
        </swiper-slide>
        <swiper-slide>阿斯顿发</swiper-slide>
      </swiper>
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
      model: null,
      currentSkillIndex: 0
    };
  },
  watch: {
    id: "fetch"
  },
  computed: {
    skill() {
      return this.model.skills.length > 0 && this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.page-hero {
  .top {
    background: white no-repeat top center;
    background-size: 100% auto;
    height: 50vw;
  }
  .info {
    padding-top: 8rem;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        font-size: 10px;
        text-align: center;
        line-height: 1rem;
        border-radius: 50%;
        margin: 0 0.5rem;
      }
    }
  }
  .skills {
    .skill-icon {
      width: 70px;
      height: 70px;
      border: 3px solid white;
      &.active {
        border-color: map-get($colors, "primary");
        border-radius: 50%;
      }
    }
  }
}
</style>
