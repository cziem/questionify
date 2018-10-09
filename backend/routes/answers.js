const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = express.Router()

// create answers
router.post('/:qID/answers', (req, res) => {
  res.json({
    response: 'A POST request for CREATING answers',
    question: req.params.qID,
    body: req.body
  })
})

// updating an answer
router.put('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: 'A PUT request for EDITING answers',
    question: req.params.qID,
    answer: req.params.aID,
    body: req.body
  })
})

// delete an answer
router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: 'A DELETE request for REMOVING an answer',
    question: req.params.qID,
    answer: req.params.aID,
    body: req.body
  })
})

// vote an answer
router.post('/:qID/answers/:aID/vote-:dec', (req, res) => {
  res.json({
    response: 'A POST request for VOTING on answers',
    question: req.params.qID,
    answer: req.params.aID,
    vote: req.params.dec,
    body: req.body
  })
})

module.exports = router
