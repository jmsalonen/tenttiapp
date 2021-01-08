
const onkoLukuja = (x) => {
  return x.every(item => typeof item=='number')
}

const summa = (a, b) => {
  
  if (onkoLukuja([a, b]))
    return a + b
  else 
    return "anna lukuja"
}

module.exports = {
  summa: summa
}
//ryhmä 2
//janne karjalaisen juha vartiaisen juha virran jyrki