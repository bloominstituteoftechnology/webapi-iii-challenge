const server = require('./server');

// const port = 9000;
// server.listen(port, () => console.log(`\nIt Lives!\n`)); 

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nIt Lives!\n`));
