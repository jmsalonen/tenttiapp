const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/profile', (req, res, next) => {
  const text = `
    SELECT id, name, email, usertype 
    FROM appuser
    WHERE id = $1
  `
  const values = [req.user.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    //next()
    return res.json(result.rows[0])
  })
/*   res.json({
    message: "Secure profile accessed!",
    user: req.user,
    token: req.query.secret_token
  }) */
}) 

router.put('/course', (req, res) => {
  const text = `
    SELECT course.id AS id, course.name AS name
    FROM course
    LEFT JOIN appuser_course ON appuser_course.id_course = course.id
    WHERE appuser_course.id_appuser = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.put('/course/exam', (req, res) => {
  const values = [req.body.user, req.body.course]
  const text = `
    SELECT exam.id AS id, exam.name AS name
    FROM appuser 
    LEFT JOIN appuser_course ON appuser_course.id_appuser = appuser.id
    LEFT JOIN course ON course.id = appuser_course.id_course
    LEFT JOIN course_exam ON course_exam.id_course = course.id
    LEFT JOIN exam ON exam.id = course_exam.id_exam
    WHERE appuser.id = $1 AND course.id = $2
  `
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

module.exports = router
