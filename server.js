const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.json({ server: "running" });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
