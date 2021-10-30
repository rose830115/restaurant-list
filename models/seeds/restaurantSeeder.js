const mongoose = require('mongoose')
const db = mongoose.connection
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(() => { console.log('done') })
})