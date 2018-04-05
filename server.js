const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
// const cors = require('cors');

const userRouter = require('./user/userRouter.js');
const postRouter = require('./user/postRouter.js');
const tagRouter = require('./user/tagRouter.js');

const server = express();

// const userDb = require('./data/helpers/userDb.js');
// const postDb = require('./data/helpers/postDb.js');
// const tagDb = require('./data/helpers/tagDb.js');


function logger(req, res, next) {
    console.log('body: ', req.body);

    next();
}

server.use(helmet());
// server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);




server.get('/', function(req, res){
    res.json({ api: 'Running...'})

})


// server.get('/api/users', function(req, res) {

//     userDb
//     .get()
//     .then(users => {
//         res.status(200).json(users);
//     })
//     .catch(error => {
//         res.status(500).json({error: 'Users not found'})
//     })


// })

// server.get('/api/users/posts', function(req, res) {
//     postDb
//     .get()
//     .then(posts => {
//         res.status(200).json(posts);
//     })
//     .catch(error => {
//         res.status(500).json({error: 'Posts dont exist.'})
//     })
// })

// server.get('/api/:userId', function(req, res) {
//     const {userId} = req.params
//     userDb
//     .get(userId)
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(error => {
//         res.status(500).json({error: 'User dont exist.'})
//     })


// })

// server.get('/api/:userId/posts', function(req, res) {
//     const {userId} = req.params

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         res.status(200).json(post);
//     }) 
//     .catch(error => {
//         res.status(500).json({error: 'That user has no legs :(.'})
//     })

// })

    
// server.get('/api/:userId/:postId', function(req, res) {
// const {userId} = req.params;
// const {postId} = req.params;

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         postDb
//         .get(postId)
//         .then(userPost => {
//         res.status(200).json(userPost);
//         })
        
//     })
//     .catch(error => {
//         res.status(500).json({error: 'That users legs have no legs :(:('})
//     })
// });

// server.get('/api/:userId/:postId/:tagId', function(req, res) {
//     const {userId} = req.params;
//     const {postId} = req.params;
//     const {tagId} = req.params;

//     userDb
//     .getUserPosts(userId)
//     .then(post => {
//         postDb
//         .get(postId)
//         .then(userPost => {
//         tagDb
//         .get(tagId)
//         .then(postTag => {
//             res.status(200).json(postTag)
//         })

//         })
//     .catch(error =>{
//         res.status(500).json({error: 'Go deeper down the rabbit hole.'})
//     })    
//     })
// })


// // server.get('/api/posts', function(req, res) {
// //     postDb
// //     .get()
// //     .then(posts => {
// //         res.status(200).json(posts);
// //     })
// //     .catch(error => {
// //         res.status(500).json({error: 'Posts dont exist.'})
// //     })
// // })


// server.get('/api/tags', function(req, res) {
//     tagDb
//     .get()
//     .then(tags => {
//         res.status(200).json(tags);
//     })
//     .catch(error => {
//         res.status(500).json({error: 'Tags dont exist.'})
//     })
// })



const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));