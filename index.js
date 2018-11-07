const server = require("./api/server.js");
const port = 9001;

server.listen(port, () => console.log("running the api on port >9000"));