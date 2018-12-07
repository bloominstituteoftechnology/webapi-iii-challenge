const express = require('express');
const postDB = require('./data/helpers/postDb');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');

const server = express();
const parser = express.json();
server.use(parser);

server.use('/users', userRouter);
server.use('/posts', postRouter);


//User Endpoints




// get: function(id) {

//   insert: function(post) {
//     return db('posts')
//       .insert(post)
//       .then(ids => ({ id: ids[0] }));
//   },
//   update: function(id, post) {
//     return db('posts')
//       .where('id', id)
//       .update(post);
//   },
//   remove: function(id) {
//     return db('posts')
//       .where('id', id)
//       .del();
//   },

//Post Endpoints


const PORT = 5050;
server.listen(PORT, () => {
    console.log(`Server is super running on port ${PORT}.`);
})
