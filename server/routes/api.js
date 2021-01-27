const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()



/* router.put('/mycourse/', (req, res) => {
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
}) */    

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

/* router.put('/newcourse/', (req, res) => {
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
}) */

/* router.put('/deletecourse/', (req, res) => {
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
}) */ 

router.put('/joincourse/', (req, res) => {
  const text = `
    INSERT INTO appuser_course VALUES ($1, $2)
  `
  const values = [req.body.userid, req.body.courseid]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`joincourse`)
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
    res.status(200).send(`leavecourse`)
  })
})

/* router.put('/deleteexam/', (req, res) => { 
  const text = `
    DELETE FROM exam 
    WHERE id = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Exam deleted with ID: ${req.body.id}`)
  })
}) */

// --- 
/* 
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

router.get('/exam/:id', (req, res) => {
  const text = `
    SELECT exam.id AS id, exam.name AS name
    FROM appuser
    LEFT JOIN exam ON exam.id_appuser = appuser.id 
    LEFT JOIN course_exam ON course_exam.id_exam = exam.id
    LEFT JOIN course ON course.id = course_exam.id_course
    WHERE appuser.id = $1
  `
  db.query(text, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.get('/exam/:id', (req, res) => {
  db.query('SELECT * FROM exam WHERE id = $1', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

router.get('/course/:id', (req, res) => {
  const text = `
    SELECT course.id AS id, course.name AS name
    FROM appuser 
    LEFT JOIN appuser_course ON appuser_course.id_appuser = appuser.id
    LEFT JOIN course ON course.id = appuser_course.id_course
    WHERE appuser.id = $1
  `
  db.query(text, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})


router.get('/exam/:id/question', (req, res) => {
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
    if (result.rows[0].id === null)
      res.send([])  
    else
      res.send(result.rows)
  })
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

router.get('/exam/:exam/answer/:user', (req, res) => {
  const text = `
    SELECT exam_appuser_choice.answer AS answer, choice.correct AS correct, choice.name AS name, question.id AS questionid, choice.id AS choiceid, exam_appuser_choice.finished AS finished
    FROM exam_appuser_choice
    LEFT JOIN choice ON choice.id = exam_appuser_choice.id_choice
    LEFT JOIN question ON question.id = choice.id_question
    WHERE exam_appuser_choice.id_appuser = $1 AND exam_appuser_choice.id_exam = $2
    ORDER BY choice.id
  `
  db.query(text, [req.params.user, req.params.exam], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})
 */

/* router.delete('/delete/question/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM question WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Question deleted with ID: ${id}`)
  })
})

router.post('/add/question/:id', (req, res) => {
  db.query('INSERT INTO question VALUES (DEFAULT, $1, \'\')', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

router.put('/update/question/', (req, res) => {
  const text = `
    UPDATE question
    SET name = $2
    WHERE id = $1
  `
  const values = [req.body.id, req.body.name]

  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

router.delete('/delete/choice/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM choice WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Choice deleted with ID: ${id}`)
  })
})

router.post('/add/choice/:id', (req, res) => {
  db.query('INSERT INTO choice VALUES (DEFAULT, $1, \'\', false)', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

router.put('/update/choice/', (req, res) => {
  const text = `
    UPDATE choice
    SET name = $2
    WHERE id = $1
  `
  const values = [req.body.id, req.body.name]

  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

router.put('/update/correct/', (req, res) => {
  const text = `
    UPDATE choice
    SET correct = $2
    WHERE id = $1
  `
  const values = [req.body.id, req.body.correct]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Correct answer changed to ID: ${result.insertId}`)
  })
})

router.put('/update/answer/', (req, res) => {
  const text = `
    UPDATE exam_appuser_choice
    SET answer = $4
    WHERE id_exam = $1 AND id_appuser = $2 AND id_choice = $3
  `
  const values = [req.body.exam, req.body.user, req.body.choice, req.body.value]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Correct answer changed to ID: ${result.insertId}`)
  })
})
*/
module.exports = router
