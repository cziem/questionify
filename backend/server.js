const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
require('dotenv').config()

// Import Routers
const questions = require('./routes/questions')
// const errors = require('./middlewares/errors')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect to DB
const options = { useNewUrlParser: true }
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => console.log('connected to DB...'))
  .catch(err => console.log('Could not connect', err))

// use routers
// app.use(errors)
app.use('/questions', questions)

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
