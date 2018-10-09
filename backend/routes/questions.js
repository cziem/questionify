const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    response: 'A GET request for LOOKING at questions'
  })
})

router.post('/', (req, res) => {
  res.json({
    response: 'A POST request for CREATING questions',
    body: req.body
  })
})

router.get('/:qID', (req, res) => {
  res.json({
    response: `A GET request for LOOKING at a special answer id: ${req.params.qID}`
  })
})

module.exports = router
