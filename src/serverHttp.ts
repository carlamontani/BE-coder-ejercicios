const http = require('http')

const server = http.createServer((req: any, res:any) => {
    res.end('hola http')
})


const PORT = 3000

const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
})

