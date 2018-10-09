const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Functions
// Sort answers
const sortAnswers = (a, b) => a.votes === b.votes ? b.updateAt - a.updateAt : b.votes - a.votes

// Schemas
const AnswerSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
})

// update method
AnswerSchema.method('update', function (updates, cb) {
  Object.assign(this, updates, { updatedAt: new Date() })
  this.parent().save(cb)
})

// vote method
AnswerSchema.method('vote', function (vote, callback) {
  if (vote === 'up') {
    this.votes += 1
  } else {
    this.votes -= 1
  }
  this.parent().save(cb)
})

const QuestionSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
  answers: [AnswerSchema]
})

QuestionSchema.pre('save', function (next) {
  this.answers.sort(sortAnswers)
  next()
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports.Question = Question
