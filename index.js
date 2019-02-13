// code away!
const server = require('./server');

const port = 3333;


server.listen(port, () => {
    console.log(`\n*** Server running on ${port} ***\n`)
})