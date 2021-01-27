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
router.put('/get/question', (req, res) => { // /get/question/
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
router.put('/get/choice', (req, res) => { // /get/choice/
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

router.put('/add/question/', (req, res) => {
  const text = `
    INSERT INTO question VALUES (DEFAULT, $1, \'\')
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added`)
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
    res.status(200).send(`Question deleted with ID: ${req.body.id}`)
  })
}) 

router.put('/add/choice/', (req, res) => {
  const text = `
    INSERT INTO choice VALUES (DEFAULT, $1, \'\', false)
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New choice added!`)
  })
})

router.put('/delete/choice/', (req, res) => {
  const text = `
    DELETE FROM choice
    WHERE id = $1
  `
  const values = [req.body.id]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Choice deleted with ID: ${req.body.id}`)
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
    res.status(201).send(`Question updated!`)
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
    res.status(201).send(`Choice updated!`)
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
    res.status(201).send(`Correct answer updated!`)
  })
})

router.put('/update/exam/', (req, res) => {
  const text = `
    UPDATE exam
    SET name = $2
    WHERE id = $1
  `
  const values = [req.body.id, req.body.name]
  db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Exam updated!`)
  })
}) 


module.exports = router
