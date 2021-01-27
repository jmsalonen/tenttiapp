const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')
const passport = require('passport')
const app = express()
const PORT = 3001

require('./passport/passport')
const userRoutes = require('./routes/user-routes')
const teacher = require('./routes/teacher')
const student = require('./routes/student')
const auth = require('./routes/authentication')

app.use(cors()) 
app.use(bodyParser.json()) 
app.use('/', auth)
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes)
app.use('/user/teacher', teacher)
app.use('/user/student', student)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
