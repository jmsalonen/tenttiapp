const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()


// --------

router.put('/user/profile', (req, res) => {
  const text = `
    SELECT appuser.name AS name, exam.name AS exam, question.name AS question, choice.name AS choice, exam_appuser_choice.answer AS answer, choice.correct AS correct
    FROM appuser 
    LEFT JOIN appuser_course ON appuser_course.id_appuser = appuser.id
    LEFT JOIN course ON course.id = appuser_course.id_course
    LEFT JOIN course_exam ON course_exam.id_course = course.id
    LEFT JOIN exam ON exam.id = course_exam.id_exam
    LEFT JOIN question ON question.id_exam = exam.id
    LEFT JOIN choice ON choice.id_question = question.id
    LEFT JOIN exam_appuser_choice ON exam_appuser_choice.id_choice = choice.id AND exam_appuser_choice.id_appuser = appuser.id
    WHERE appuser.id = $1
    ORDER BY question.id, choice.id
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  }) 
})
/*
router.get('/user/:id', (req, res) => {
  db.query('SELECT * FROM appuser WHERE id = $1', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})
*/
router.get('/users/', (req, res) => {
  db.query('SELECT * FROM appuser', (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.get('/user/:id/exam', (req, res) => {
  const text = `
    SELECT exam.name 
    FROM appuser 
    LEFT JOIN exam ON appuser.id = exam.id_appuser 
    WHERE appuser.id = $1
  `
  db.query(text, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.post('/add/user/:name/:type', (req, res) => {
  const { name, type } = req.params
  db.query('INSERT INTO appuser VALUES (DEFAULT, $1, $2)', [name, type], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

router.post('/add/user/', (req, res) => {
  db.query('INSERT INTO appuser VALUES (DEFAULT, $1, $2)', [req.body.name, req.body.usertype], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

router.delete('/delete/user/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM appuser WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
})

router.put('/finished/', (req, res) => {
  const text = `
    UPDATE exam_appuser_choice 
    SET finished = true
    WHERE id_exam = $1 AND id_appuser = $2;  
  `
  const values = [req.body.exam, req.body.user]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Correct answer changed to ID: ${result.insertId}`)
  })
})


module.exports = router
