const server = require('./server');

const port = 9000


server.listen(port, () => {
    console.log(`Its happening on port ${port}`);
});