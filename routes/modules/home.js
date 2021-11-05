const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//R瀏覽全部所有餐廳
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//搜尋功能
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }

  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  let nowSort = ''
  switch (sort) {
    case 'A > Z':
      nowSort = { name: 1 }
      break
    case 'Z > A':
      nowSort = { name: -1 }
      break
    case '類別':
      nowSort = { category: 1 }
      break
    case '地區':
      nowSort = { location: 1 }
      break
    default:
      nowSort = { name: 1 }
      break
  }

  Restaurant.find()
    .lean()
    .sort(nowSort)
    .then(restaurants => {
      restaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword)
      )
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.error(error))
})


module.exports = router