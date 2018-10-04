const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

const app = express();

// middleware config
app.use(cors());
app.use(logger("short"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api", require("./routes"));

app.listen(5000, () => console.log("\nServer listening on port 5000\n"));
