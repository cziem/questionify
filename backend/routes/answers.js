const express = require('express')
const router = express.Router()
const errors = require('../middlewares/errors')

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id)
  if (!req.answer) {
    err = new Error('Answer not found')
    err.status = 404
    res.send(err)
    return next(err)
  }
  return next()
})

// create answers
router.post('/', (req, res, next) => {
  console.log(req.question)
  // req.question.answers.push(req.body)
  // req.question.save((err, question) => {
  //     if (err) return next(err)
  //     res.status(201)
  //     res.json(question)
  // })
})

// updating an answer
router.put('/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, result) => {
    if (err) return next(err)
    res.status(201)
    res.json(result)
  })
})

// delete an answer
router.delete('/:qID/answers/:aID', (req, res) => {
  req.answer.remove(err => {
    req.question.save((err, questoin) => {
      if (err) return next(err)
      res.json(question)
    })
  })
})

// vote an answer
router.post('/:qID/answers/:aID/vote-:dec', (req, res, next) => {
  if (req.params.dec.search(/^(up|down)$/) === -1) {
    const err = new Error(`Not possible to vote for ${req.params.dec}!`)
    err.status = 404
    next(err)  
  } else {
    req.vote = req.params.dec
    next()
  }
}, (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err)
     res.json(question)
  })
})

module.exports = router
