const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()

var corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions)) 

var bodyParser = require('body-parser')
app.use(bodyParser.json())

/* const requestTime = (req, res, next) => {
  console.log('Kello: ' + Date.now())
  next()
}
app.use(requestTime) */

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/user/', (req, res) => {
  db.query('SELECT * FROM appuser', (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.get('/user/:id', (req, res) => {
  db.query('SELECT * FROM appuser WHERE id = $1', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.get('/exam/', (req, res) => {
  db.query('SELECT * FROM exam', (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.get('/exam/:id', (req, res) => {
  db.query('SELECT * FROM exam WHERE id = $1', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.get('/user/:id/exam', (req, res) => {
  db.query('SELECT exam.name FROM appuser LEFT JOIN exam ON appuser.id = exam.id_appuser WHERE appuser.id = $1', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.get('/exam/:id/question', (req, res) => {
  const text = `
    SELECT question.id AS id, question.name AS question
    FROM exam
    LEFT JOIN question ON question.id_exam = exam.id
    WHERE exam.id = $1
    ORDER BY question.id`
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

app.get('/exam/:id/choice', (req, res) => {
  const text = `
    SELECT choice.id AS id, question.id AS questionid, choice.name AS choice, choice.correct AS correct
    FROM exam
    LEFT JOIN question ON question.id_exam = exam.id
    LEFT JOIN choice ON choice.id_question = question.id
    WHERE exam.id = $1
    ORDER BY choice.id`
  db.query(text, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(result.rows)
  })
})

app.post('/add/user/:name/:type', (req, res) => {
  const { name, type } = req.params
  db.query('INSERT INTO appuser VALUES (DEFAULT, $1, $2)', [name, type], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

app.post('/add/user/', (req, res) => {
  db.query('INSERT INTO appuser VALUES (DEFAULT, $1, $2)', [req.body.name, req.body.usertype], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

app.delete('/delete/user/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM appuser WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
})

app.delete('/delete/question/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM question WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Question deleted with ID: ${id}`)
  })
})

app.post('/add/question/:id', (req, res) => {
  db.query('INSERT INTO question VALUES (DEFAULT, $1, \'\')', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

app.put('/update/question/', (req, res) => {
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

app.delete('/delete/choice/:id/', (req, res) => {
  let id = parseInt(req.params.id)

  db.query('DELETE FROM choice WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Choice deleted with ID: ${id}`)
  })
})

app.post('/add/choice/:id', (req, res) => {
  db.query('INSERT INTO choice VALUES (DEFAULT, $1, \'\', false)', [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`New question added to ID: ${result.insertId}`)
  })
})

app.put('/update/choice/', (req, res) => {
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

app.put('/update/correct/', (req, res) => {
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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
