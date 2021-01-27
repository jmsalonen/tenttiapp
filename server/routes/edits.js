const express = require('express')
const router = express.Router()
const db = require('../db')

router.put('/deletecourse/', (req, res, next) => {
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
  next()
})

router.put('/deleteexam/', (req, res, next) => { 
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
  next()
})

router.delete('/delete/question/:id/', (req, res, next) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM question WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Question deleted with ID: ${id}`)
  })
  next()
})

router.post('/add/question/:id', (req, res, next) => {
  db.query('INSERT INTO question VALUES (DEFAULT, $1, \'\')', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  }) 
  next()
})

router.put('/update/question/', (req, res, next) => {
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

  req.data = {
    type: "edit", 
    message: `Exam ID:${req.body.examid} has been edited`,
    examid: req.body.examid
  }
  next()
})

router.delete('/delete/choice/:id/', (req, res, next) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM choice WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Choice deleted with ID: ${id}`)
  })
  next()
})

router.put('/add/choice/', (req, res, next) => {
const text = `
  INSERT INTO choice VALUES (DEFAULT, $1, \'\', false)
`
const values = [req.body.id]

db.query(text, values, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
  req.data = {
    type: "edit", 
    message: `Exam ID:${req.body.examid} has been edited`,
    examid: req.body.examid
  }
  next()
})

router.put('/update/choice/', (req, res, next) => {
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
  req.data = {
    type: "edit", 
    message: `Exam ID:${req.body.examid} has been edited`,
    examid: req.body.examid
  }
  next()
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

router.put('/update/answer/', (req, res, next) => {
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
  next()
})


module.exports = router
