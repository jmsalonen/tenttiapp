var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//console.log(token)
//jwt.verify(token, secretOrPublicKey, [options, callback])

const SALT_ROUNDS = 12
let alku = Date.now()
let loppu = 0
/* 
bcrypt.compare("kissa", hassis, (err, result) => {
  console.log("bcrypt.compare: ", result)
}) */

/* bcrypt.hash("kissa", SALT_ROUNDS, (err, hash) => {
  console.log("hash: ", hash)
  loppu = Date.now()
  console.log("ms: ", (loppu-alku))
  bcrypt.compare("kissa", hash, (err, result) => {
    console.log("bcrypt.compare: ", result)
  })
}) */


const f = async () => {
  let salasana = await bcrypt.hash("kissa", SALT_ROUNDS)
  console.log(salasana)
  let vertaus = await bcrypt.compare("kissa", salasana)
  console.log(vertaus)
}
f()

/* 
try {
  var decoded = jwt.verify(token, 'shhhhh');
} catch(err) {
  console.log(err)
}

console.log(decoded) */