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

module.exports = router