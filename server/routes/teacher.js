const express = require('express')
const router = express.Router()
const db = require('../db')

router.put('/new/course/', (req, res) => {
  let text = `
    INSERT INTO course VALUES (DEFAULT, $1) RETURNING id
  `
  let values = [req.body.name]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    let newCourseId = result.rows[0].id
    text = `
      INSERT INTO appuser_course VALUES ($1, $2) RETURNING *
    `
    values = [req.body.id, newCourseId] 
    db.query(text, values, (error, result) => {
      if (error) {
        throw error
      }
      console.log(result.rows)
    })
  })
})

router.put('/delete/course/', (req, res) => {
  const text = `
    DELETE FROM course 
    WHERE id = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Course deleted with ID: ${req.body.id}`)
  })
}) 

// ykköne pois - topic
router.put('/new/exam/', (req, res) => {
  let text = `
    INSERT INTO exam VALUES (DEFAULT, 'default-value', 1, $1) RETURNING id
  `
  let values = [req.body.user]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    let newExamId = result.rows[0].id
    text = `
      INSERT INTO course_exam VALUES ($1, $2) RETURNING *
    `
    values = [req.body.course, newExamId] 
    db.query(text, values, (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).send(`new exam id: ${newExamId}`)
    })
  })
}) 


router.put('/delete/exam/', (req, res) => {
  const text = `
    DELETE FROM exam
    WHERE id = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Course deleted with ID: ${req.body.id}`)
  })
}) 

//router.get('/exam/:id/question', (req, res) => {
router.put('/question', (req, res) => {
  const text = `
    SELECT question.id AS id, question.name AS question
    FROM exam
    LEFT JOIN question ON question.id_exam = exam.id
    WHERE exam.id = $1
    ORDER BY question.id
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    if (result.rows[0].id === null)
      res.send([])  
    else
      res.send(result.rows)
  })
}) 

//router.get('/exam/:id/choice/', (req, res) => {
router.put('/choice', (req, res) => {
  const text = `
    SELECT choice.id AS id, question.id AS questionid, choice.name AS choice, choice.correct AS correct
    FROM exam
    LEFT JOIN question ON question.id_exam = exam.id
    LEFT JOIN choice ON choice.id_question = question.id
    WHERE exam.id = $1
    ORDER BY choice.id
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.put('/delete/question/', (req, res) => {
  const text = `
    DELETE FROM question
    WHERE id = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Course deleted with ID: ${req.body.id}`)
  })
}) 

module.exports = router
