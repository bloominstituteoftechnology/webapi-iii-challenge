const server = require('./server')
const port = 8008

server.listen(port, () => {
    console.log(`Hearing voices on port ${port}...`)
})