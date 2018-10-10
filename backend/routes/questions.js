const express = require('express')
const router = express.Router()
const Question = require('../model/schema').Question

const errors = require('../middlewares/errors')

// router param
router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err)
    if (!doc) {
      err = new Error('Document not found')
      err.status = 400
      return next(err)
    }
    req.question = doc
    return next()
  })
})

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
