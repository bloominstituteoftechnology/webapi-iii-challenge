const server = require("./api/server");

// server listen
const port = process.env.PORT || 9000;
server.listen(port, () => console.log("Server is started"));
