const serever = require("./api/server.js");

const port = 9000;
serever.listen(port, () => console.log(`running on port ${port}`));
