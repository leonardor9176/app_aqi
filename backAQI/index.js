const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const {port} = require('./config')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

console.log('app runing ')

app.use('/aqi', require('./helpers/airQualityIndexService'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`) //root -> localhost:3030
})