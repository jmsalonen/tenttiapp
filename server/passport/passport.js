const passport = require('passport')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const db = require('../db')
const SALT_ROUNDS = 12

// Local Strategy

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

const localRegister = new localStrategy(localOptions,
  async (req, email, password, done) => {
    let password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    const text = `
      INSERT INTO appuser VALUES (DEFAULT, $1, $2, $3, $4)
    `
    const values = [req.body.name, email, password_hash, req.body.usertype]
    db.query(text, values, (error, result) => {
      if (error) {
        throw error
      }
    })
    done(null, { email, password_hash })
  }
)

const localLogin = new localStrategy(localOptions,
  async (req, email, password, done) => {
    const text = `
      SELECT *
      FROM appuser 
      WHERE email = $1
    `
    const values = [email]
    db.query(text, values, async (error, result) => {
      const user = result.rows[0]
      const compare = await bcrypt.compare(password, user.password)

      if (!compare) {
        return done(null, false, { message: 'Wrong Password' })
      }
      return done(null, user, { message: 'Logged in Successfully' })
    })
  }
)

passport.use('register', localRegister)
passport.use('login', localLogin)

// Jwt Strategy

const jwtOptions = {
  secretOrKey: 'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromHeader('authorization')
}

const jwtVerification = new JWTstrategy(jwtOptions,
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error)
    }
  }
)

passport.use(jwtVerification)
