const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./data/routers/usersRouter.js");
const postsRouter = require("./data/routers/postsRouter.js");

const app = express();
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", function(req, res) {
  res.json({ server: "running" });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
