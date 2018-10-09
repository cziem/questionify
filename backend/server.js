const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// Import Routers
const test = require('./routes/test')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to DB
const options = { useNewUrlParser: true }
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => console.log('connected to DB...'))
  .catch(err => console.log('Could not connect', err))

app.use('/test', test)

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
