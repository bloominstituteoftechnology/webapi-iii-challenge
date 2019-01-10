const express = require("express");
const morgan = require("morgan");
const index = require("./index.js");
const helmet = require("helmet");
const cors = require("cors")

const server = express();
const port = 5000;
///////////////////////
// Middleware

//example of short cutting the request 
function doubler(req,res,next){
    const value = req.query.number;
    if(value){
        req.double = value * 2;
        next()
    } else {
        res.status(400).send("please provide a number")
    }
};

server.use(morgan("short"));
server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use(doubler)


///////////////////////
//

server.get("/",(req,res) => {
    res.status(200).send(`sanity check success`);
})

// syntax to use middleware locally
server.get("/double",doubler,(req,res) => {
    res.status(200).send(`server alive ${req.query.number} is ${req.double}`);
})

server.get("/:id",(req,res) => {
    res.status(200).send(`server alive id ${req.params.id}`);
})



// index.greet()
// console.log(index.secret)
server.listen(port,() => console.log(`The server is listening on port ${port}`))
