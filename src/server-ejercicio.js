const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3031

app.get('/api/suma/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params;
  const suma = Number(num1) + Number(num2);
  res.status(200).send(`El resultado de la suma es: ${suma}`)
})

app.get('/api/sumar', (req, res) => {
  const { num1, num2 } = req.query ;
  const suma = Number(num1) + Number(num2);
  res.status(200).send(`${suma} ${num1} ${num2}`)
})

app.get('/api/operacion/:operacion', (req, res) => {
  const { operacion } = req.params ;
  //no recomendado
  const suma = eval(operacion);
  res.status(200).send(`${suma}`)
})

const server = app.listen(PORT, () =>
  console.log(`Server en port http://localhost:3031`)
)

server.on('error', (err) => console.log(err))