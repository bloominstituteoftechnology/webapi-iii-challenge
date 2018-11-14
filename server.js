const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors({}));

const errorMsg = (status, msg, res) => {
  res.status(status).json({ error: msg })
};