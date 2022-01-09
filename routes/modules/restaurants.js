const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//R進入新增表單
router.get('/new', (req, res) => {
  res.render('new')
})

//C新增餐廳
router.post('/', (req, res) => {
  const newRestaurant = req.body
  const userId = req.user._id

  return Restaurant.create({
    name: newRestaurant.name,
    name_en: newRestaurant.name_en,
    category: newRestaurant.category,
    image: newRestaurant.image,
    location: newRestaurant.location,
    phone: newRestaurant.phone,
    google_map: newRestaurant.google_map,
    rating: newRestaurant.rating,
    description: newRestaurant.description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//R瀏覽一家餐廳的詳細資訊
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

//R進入修改表單
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

//U修改一家餐廳資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const updatedRestaurant = req.body

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = updatedRestaurant.name
      restaurant.name_en = updatedRestaurant.name_en
      restaurant.category = updatedRestaurant.category
      restaurant.image = updatedRestaurant.image
      restaurant.location = updatedRestaurant.location
      restaurant.phone = updatedRestaurant.phone
      restaurant.google_map = updatedRestaurant.google_map
      restaurant.rating = updatedRestaurant.rating
      restaurant.description = updatedRestaurant.description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

//D刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router