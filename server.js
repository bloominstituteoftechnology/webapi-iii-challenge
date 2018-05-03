const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dbConfig= require('./data/dbConfig');


const routerPost = require('./Routers/routerPost')
const routerUser = require('./Routers/routerUser')
const routerTag = require('./Routers/routerTag')
const server = express();

server.use(helmet())
server.use(cors());
server.use(express.json());

server.use('/users', routerUser)
server.use('/posts',routerPost)
server.use('/tags', routerTag)
server.get('/', (req, res)=>{
    res.send('api is running')
})




server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));