const moment = require('moment')
const express = require('express');

const usersRoutes = require('./users/userRouter');
const postsRoutes = require('./posts/postRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');;

  console.log(`you made a ${method} request to ${url} at ${timestamp}`);
  next();
};


server.use(logger)
server.use('/users', usersRoutes);
server.use('/posts', postsRoutes)



module.exports = server;
// // 1. Write and implement four custom `middleware` functions, detailed below.
// // 1. Build an API to let clients perform CRUD operations on `users`.
// // 1. Add endpoints to retrieve the list of `posts` for a `user` and to store a new `post` for a `user`.

// // #### Custom Middleware Requirements

// // - `logger()`
// //   - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
// //   - this middleware runs on every request made to the API

// // - `validateUserId()`
// //   - `validateUserId` validates the user id on every request that expects a user id parameter
// //   - if the `id` parameter is valid, store that user object as `req.user`
// //   - if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`

// // - `validateUser()`
// //   - `validateUser` validates the `body` on a request to create a new user
// //   - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
// //   - if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`

// // - `validatePost()`
// //   - `validatePost` validates the `body` on a request to create a new post
// //   - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
// //   - if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
// //custom middleware
// server.get("/api/users", (request, response) => {
//   db.find()
//     .then(user => {
//       response.status(200).json(user);
//     })
//     .catch(err => {
//       response.status(500).json({ success: false, err });
//     });
// });
// //   function findById(id) {
// //     return db('users')
// //       .where({ id: Number(id) })
// //       .first();
// //   }
// server.get("/api/users/:id", (req,res) => {
// const {id} = req.params;
// console.log(id)
//   db.findById(id)
//       .then(user => {
//        if(user){
//            res.status(200).json({user});
//        }else {
//           res
//             .status(400)
//             .json({ error: "The id:"+`${id}`+ "  does not exist." });
//         }
//       })
//       .catch(err => {
//           response
//             .status(500)
//             .json({ error: "An error occured getting the user info" });
//         });


// })
// //=====================================//

// //Post Requests

// server.post("/api/users", (req, res) => {
//   const { name, bio } = req.body;
//   if (!name || !bio) {
//     return res
//       .status(400)
//       .json({ error: "YO BRO , run me that name or bio" });
//   }
//   db.insert({ name, bio })
//     .then(res => {
//       const { id } = res;
//       db.findById(id).then(user => {
//         res.status(200).json(user);
//       });
//     })
//     .catch(err => {
//       res
//         .status(400)
//         .json({ errorMessage: "Whats your name cutie ;)" });
//     });
// });

// //============================//
// // function update(id, user) {
// //     return db('users')
// //       .where('id', Number(id))
// //       .update(user);
// //   }
// server.put('api/users/:id', (req,res) => {
//   const {id, user} = req.body;
//   db.update({id, user}).then(user => {
//       //some code
//   }

//   ).catch(res => {
//       res.json({errorMessage:"Hey you failure"})
//   });

// })
// //===========================//
// //Delete-from solution
// server.delete('/api/users/:id', (req, res) => {
//   Users.remove(req.params.id)
//     .then(count => {
//       if (count && count > 0) {
//         res.status(200).json({
//           message: 'Bye Bye',
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: 'Doesnt believe' });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ errorMessage: 'The user could not be removed' });
//     });
// });

// function logger(req, res, next) {

// };

// module.exports = server;
