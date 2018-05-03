const express = require('express')
const server = express();
const db = require('./data/helpers/postDb');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const {greeter,logger} = require('./middleware');
server.use(bodyParser.json());
server.use(cors());
server.use(helmet());


server.use(greeter('hilal'))
server.use(logger('loading'));

server.get('/', (req,res)=>{
    res.send('hilal aissni')
    console.log('hilalal');
});

const postsRoute = require('./postsRoute')
const tagsRoute = require('./tagsRoute')
const userRoute = require('./usersRoute')

server.use('/posts', postsRoute)
server.use('/tags', tagsRoute)
server.use('/users', userRoute)









server.listen(5000);