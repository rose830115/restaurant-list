const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const port = 3000
const db = mongoose.connection
const restaurantList = require('./restaurant.json').results
const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant-list')

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//搜尋功能
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  )
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})