const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json').results

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant })
})

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