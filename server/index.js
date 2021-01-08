const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')
const passport = require('passport')

const app = express()

require('./passport/passport')
const routes = require('./routes/routes')
const userRoutes = require('./routes/user-routes')
const auth = require('./routes/authentication')
const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions)) 
app.use(bodyParser.json()) 
app.use('/', auth)
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
