const server = require("./api/server.js");
const port = 9000
server.listen(port,() => console.log('API is running on the port:',port))