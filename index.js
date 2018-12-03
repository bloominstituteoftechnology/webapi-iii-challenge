const express = require("express");
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
