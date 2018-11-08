const server = require("./api/server.js");
const port = process.env.PORT || 9001;

server.listen(port, () => console.log("running the api on port >9000"));