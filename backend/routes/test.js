const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/', async (req, res) => {
  res.send('Welcome to Questionify')
})

module.exports = router
