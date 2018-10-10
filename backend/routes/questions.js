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
  Question.find({}).sort({ createdAt: -1 }).exec((err, questions) => {
    if (err) return next(err)
    if (questions.length <= 0) {
      res.send('There are no questions')
    } else {
      res.json(questions)
    }
  })
})

router.post('/', (req, res, next) => {
  if (req.body.text) {
    const question = new Question(req.body)
    question.save((err, question) => {
      if (err) return next(err)
      res.status(201)
      res.json(question)
    })
  } else {
    res.send('You cannot save empty questions')
  }
})

router.get('/:qID', (req, res) => {
  res.json(req.question)
})

module.exports = router
