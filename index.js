const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const PORT = 4001;
const userDb = require('./data/helpers/userDb')


const server = express()
server.use(express.json(), logger('tiny'), helmet(), cors() ) //express.json allows to parse the body
//helmet gives more protection to app, logger/morgan logs everything

server.get('/', (req, res) => {
    res.json({message: 'api is running'})
})

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res
            .status(500)
            .json({error: "The users information could not be retrieved."})
        })
})




server.listen(PORT, () => console.log(`API running on port ${PORT}`))