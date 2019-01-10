const server = require("./api/server.js");

const port = process.env.PORT || 5000
server.listen(5000, console.log("Server Running"));
