module.exports = app => {
  const router = require('express').Router()
  const Category = require('../../models/Category')
  const News = require('../../models/News')

  router.get('/lists/news', async (req, res) => {
    const parent = await Category.findOne({ name: '新闻资讯' }).populate('children')
    // const cats = await Category.find().where({ parent }).lean()
    // const newsList = ["5月28日全服不停机更新公告", "决战西安剑指银龙，RNG.M、eStarPro成功晋级2019KPL春季赛总决赛", "KPL无冕之王的咆哮！eStarPro2019年6月2日西安总决赛征战银龙杯", "体验服爆料 | 鹰眼统领帅炸全场，晋级赛由我守护！", "2019KPL春季赛总决赛即将开战 福利活动来助阵", "体验服爆料 | 鹰眼统领帅炸全场，晋级赛由我守护！", "王者荣耀游戏体验调研，诚邀广大召唤师参与", "【福利】王者荣耀电竞有声书全网独家首发！限时免费抢先听！", "新皮肤爆料 | KPL限定亮相，涂鸦虎子潮爆啦！", "吃硬核午餐，做硬核王者，超值3件套19元起！", "5月28日全服不停机更新公告", "部分星元皮肤显示异常说明", "5月27日“演员”惩罚名单", "《王者荣耀》特权勋章获取条件调整公告", "5月27日外挂专项打击公告", "2019KPL春季赛总决赛即将开战 福利活动来助阵", "KPL限定皮肤天狼狩猎者全服6折特权开启！", "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！", "KPL限定天狼星计划系列首款皮肤——天狼狩猎者预定开启！", "初夏作战开始 每日对战得好礼", "决战西安剑指银龙，RNG.M、eStarPro成功晋级2019KPL春季赛总决赛", "KPL无冕之王的咆哮！eStarPro2019年6月2日西安总决赛征战银龙杯", "KPL人物志：RNG虔诚＆暴风锐：光华内敛方成器", "KRKPL季后赛名额预测：GOG优势巨大，MVP晋级条件近乎苛刻", "【KPL鱼你说】决战西安"]
    // await News.insertMany(newsList.map(title => {
    //   const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
    //   return { title, categories: randomCats.slice(0, 2) }
    // }))
    // await Category.insertMany('新闻 公告 活动 赛事'.split(' ').map(name => ({
    //   parent,
    //   name,
    // })))
    const data = await Category.findOne({
      name: '新闻资讯'
    }).populate({
      path: 'children',
      populate: {
        path: 'latestNews',
        options: { limit: 5, sort: '-_id' }
      }
    }).lean()
    const hotNews = await News.find().where({
      categories: { $in: parent.children }
    }).populate('categories').limit(5)
    data.children.unshift({
      name: '热门',
      latestNews: hotNews
    })
    res.send(data)
  })
  router.get('/articles/:id', async (req, res) => {
    res.send(await News.findById(req.params.id))
  })
  app.use("/web/api", router)
}