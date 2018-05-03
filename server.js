const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routerPost = require('./Routers/routerPost')
const routerUser = require('./Routers/routerUser')
const routerTag = require('./Routers/routerTag')
const server = express();

function toUpper(req,res,next){
    console.log(req.body)
    if (req.body.tag !== undefined){
    req.body = {"tag":`${req.body.tag.toUpperCase()}`}
    console.log(req.body)
}
    next();
}
// logger =(req,res,next)=>{

//     console.log('tags:', req.url);
//     next()
// }

server.use(helmet())
server.use(cors());
server.use(express.json());
server.use('/users', routerUser)
server.use('/posts',routerPost)
server.use('/tags',toUpper, routerTag)
server.get('/', (req, res)=>{
    res.send('api is running')
})




server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));