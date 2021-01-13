const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()
/*
router.put('/mycourse/', (req, res) => {
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

router.put('/othercourse/', (req, res) => {
  const text = `
    SELECT * 
    FROM course
    LEFT JOIN appuser_course ON appuser_course.id_course = course.id
    WHERE course.id NOT IN (
      SELECT course.id
      FROM course
      LEFT JOIN appuser_course ON appuser_course.id_course = course.id
      WHERE appuser_course.id_appuser = $1)
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.put('/course/', (req, res) => {
  const text = `
    SELECT *
    FROM course
  `
  //const values = [req.body.id]
  db.query(text, (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.put('/newcourse/', (req, res) => {
  let text = `
    INSERT INTO course VALUES (DEFAULT, $1) RETURNING id
  `
  let values = [req.body.name]
  let newCourseId = 0
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    newCourseId = result.rows[0].id
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

router.put('/deletecourse/', (req, res) => {
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

router.put('/joincourse/', (req, res) => {
  const text = `
    INSERT INTO appuser_course VALUES ($1, $2)
  `
  const values = [req.body.userid, req.body.courseid]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
  })
})

router.put('/leavecourse/', (req, res) => {
  const text = `
    DELETE FROM appuser_course 
    WHERE id_appuser = $1 AND id_course = $2
  `
  const values = [req.body.userid, req.body.courseid]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
  })
})

router.get('/users/', (req, res) => {
  db.query('SELECT * FROM appuser', (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.put('/exam/', (req, res) => {
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

router.put('/exam/', (req, res) => {
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

router.put('/course/exam/', (req, res) => {
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

router.get('/exam/:id/question', (req, res) => {
  try {
    const text = `
      SELECT question.id AS id, question.name AS question
      FROM exam
      LEFT JOIN question ON question.id_exam = exam.id
      WHERE exam.id = $1
      ORDER BY question.id
    `
    db.query(text, [req.params.id], (error, result) => {
      if (error) {
        throw error
      }
//      if (result.rows[0].id === null)
//        res.send([])  
//      else
        res.send(result.rows)
    })
  }
  catch (err) {
    console.log(err)
  }
}) 

router.get('/exam/:id/choice/', (req, res) => {
  const text = `
    SELECT choice.id AS id, question.id AS questionid, choice.name AS choice, choice.correct AS correct
    FROM exam
    LEFT JOIN question ON question.id_exam = exam.id
    LEFT JOIN choice ON choice.id_question = question.id
    WHERE exam.id = $1
    ORDER BY choice.id
  `
  db.query(text, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})




*/


// ------ 





router.post('/register', passport.authenticate('register', { session: false }), async (req, res, next) => {
  res.json({
    message: "Registeration Successful",
    user: req.user
  })
})

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('Login Error')
        return next(error)
      }
      req.login(
        user, { session: false }, async (error) => {
          if (error) return next(error)
          const body = { id: user.id, name: user.name, email: user.email, usertype: user.usertype }
          const token = jwt.sign({ user: body }, 'TOP_SECRET')
          return res.json({ token })
        }
      )
    }
    catch (err) {
      return next(err)
    }
  })(req, res, next)
})

module.exports = router
