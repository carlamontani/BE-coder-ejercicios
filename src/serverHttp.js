"use strict";
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('hola http');
});
const PORT = 3000;
const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
//# sourceMappingURL=serverHttp.js.map