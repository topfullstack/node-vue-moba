module.exports = app => {
  const router = require('express').Router()

  const Ad = require('../../models/Ad')
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  const Hero = require('../../models/Hero')
  const Item = require('../../models/Item')

  // 幻灯片接口
  router.get('/ads/:id', async (req, res) => {
    res.send(await Ad.findById(req.params.id))
  })

  // 分类接口
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id).populate('children').lean()
    res.send(model)
  })

  // 新闻列表
  router.get('/articles', async (req, res) => {
    const { category } = req.query
    let where = {}
    if (category) {
      where.categories = category
    }
    const items = await Article.find().where(where).populate('categories').select('-body').sort('-_id').limit(5)
    res.send(items)
  })

  // 新闻详情
  router.get('/articles/:id', async (req, res) => {
    const model = await Article.findById(req.params.id)
    res.send(model)
  })

  // 英雄列表
  router.get('/heroes', async (req, res) => {
    const { category } = req.query
    let where = {}
    if (category) {
      where.categories = category
    }
    const items = await Hero.find().where(where).populate('categories').select('name avatar')
    res.send(items)
  })

  // 英雄详情
  router.get('/heroes/:id', async (req, res) => {
    const model = await Hero.findById(req.params.id).populate('items1 items2 categories')
    res.send(model)
  })

  app.use('/web/api', router)
}