
const funktiot = require('./moduuli')

let ajetut = 0
let onnistuneet = 0

const testSumma = (a, b, c) => {
  ajetut++
  if (funktiot.summa(a, b) === c) {
    onnistuneet++
    console.log("summa toimii")
  }
  else  {
    console.log("summa ei toimi")
  }
}

testSumma(1, 2, 3)
testSumma(1, 1, 2)
testSumma("1", 1, 2)
testSumma(2, 2, 3)

console.log("testitulos: ", onnistuneet, "/", ajetut)
