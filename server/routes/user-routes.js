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
    res.send(result.rows[0])
  })
  /* res.json({
    message: "Secure profile accessed!",
    user: req.user,
    token: req.query.secret_token
  }) */
})

module.exports = router
