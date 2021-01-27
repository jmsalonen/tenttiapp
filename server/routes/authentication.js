const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()

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
