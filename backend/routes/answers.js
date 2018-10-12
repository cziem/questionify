const express = require('express')
const router = express.Router()

const Question = require('../model/schema').Question

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id)
  if (!req.answer) {
    err = new Error('Answer not found')
    err.status = 404
    res.json({
      err,
      message: `No answer was found with given id: ${id}`
    })
    return next(err)
  }
  return next()
})

router.param('qID', (req, res, next, id) => {
	Question.findById(id, (err, doc) => {
		if (err) return next(err)
		if (!doc) {
			err = new Error('Document not found');
			err.status = 400
			return next(err)
		}
		req.question = doc
		return next()
	})
})

// create answers
router.post('/:qID', (req, res, next) => {
  console.log(req.question)
  
  req.question.answers.push(req.body)
  req.question.save((err, question) => {
    if (err) return next(err)
    res.status(201)
    res.json(question)
  })
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
  req.answer.remove(doc => {
    req.question.save((err, question) => {
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