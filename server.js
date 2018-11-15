const express = require('express');
const start = express();
start.use(express.json());

start.get('/', (req, res) => {
  res.send('Server is operational')
});

const port = 5500;
start.listen(port, () => console.log(`Server is running on port ${port}`));