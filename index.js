const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const postdb =require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb.js');

const server = express('short');//for morgan logging

server.use(express.json()); //this helps express parse json info fro req.body
server.use(helmet());
server.use(morgan());

function logger(req, res, next) {
    console.log(`${req.method} to ${req.url}`)

    next(); //calls next middelware in the queue
}

function greeter(req, res,next) {
    req.name = 'FSW12 MiddleWare';
    next();
}

// function secure(req,res,next) {
//     if (req.url === '/mellon') {
//         //next();//says go to the next middleware
//         res.send('Welcome');

//     }else{
//         res.status(401).json({message: "Not allowed"});
//     }
// }

server.use(logger);
// server.use(secure);

// server.get('/user', (req,res) => {
//     console.log(`${req.name}`)
//     res.send('API running');
// }
// );

// server.get('/user', greeter, (req,res) => {
//     res.send(`Hello ${req.name}`);
// }
// );

// server.get('/mellon', greeter, (req,res) => {
//     res.send(`Hello ${req.name}`);
// }
// );


server.get('/tags', (req,res) => {
    tagdb.get().then(tags => {
        res.status(200).json(tags);
    }).catch(err => {
        console.err('error',err);

        res.status(500).json({message: 'error: error getting data'});

    });
});


server.get('/users', (req,res) => {
    userdb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.err('error',err);

        res.status(500).json({message: 'error: error getting data'});

    });
});


server.get('/posts', (req,res) => {
    postdb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.err('error',err);

        res.status(500).json({message: 'error: error getting data'});

    });
});


server.get('/users/:id', (req, res) => {
    let { id } = req.params
    if (id) {
        userdb.get(id).then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(400).json({ error: "Please include an ID" })
    }
})


server.post('/users', (req, res) => {
    let { name, description } = req.body
    console.log(name, description)
    if (name === undefined || description === undefined) {
        res.status(400).json({ error: "Please complete the project data" })
    }
    userdb
        .insert({ text })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "a database error occured, please try again later" })
        })
})

// server.post('/posts', async (req,res) => {

//     const post = req.body;

//     if (post.title || post.contents) {
//     try {
//         const response = await db.insert(post);
//         res.status(201).json(response);

//     } catch (ex) {
//         res.status(500).json({message: "error getting data"});
//     }    
//     } else {
//         res.status(422).json({message: "Please provide title and contents for the post."});
//     }
//     // }
// });




server.listen(8000, () => console.log('API running on port 8000'));