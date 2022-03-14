const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
//app.use("/otra", express.static("public"))
app.use("/otra", express.static(__dirname + "/public"))


app.get("/", (req,res) => {
  res.sendFile("./src/index.html")
})

const PORT = 8083

const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:8083`)
)

server.on('error', (err) => console.log(err))