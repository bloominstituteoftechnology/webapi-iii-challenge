//imports
const express = require('express');
const morgan = require('morgan');




//import routes
const apiRoutes = require('./api/api'); 

//initialize server
const server = express();


//middleware
server.use(express.json());
server.use(morgan('dev'));

//external routers
server.use('/api', apiRoutes);


// function upperCaseTag(tags) {
//     console.log(tags);
//  let newTags = tags.map(tag=> {
//    tag.toUpperCase();
//  })
//  next(newTags);
// }








//NEW POST
// server.post('/api/posts', (req, res) => {

//     const userId = req.body.userId;
//     const text = req.body.text;
//     let newPost = {
//         userId,
//         text
//     };
//     postDb.insert(newPost)
//         .then(response => {
//             res.status(200).json({
//                 "success": "new post created",
//                 "post": newPost,
//                 "response": response
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 "failed": "new post was not created",
//                 "error": err
//             })
//         })
// })

//NEW TAG
// server.post('/api/tags', (req, res) => {
//     const tag = req.body.tag;
//     let newTag = {
//         tag
//     };
//     tagDb.insert(newTag)
//         .then(response => {
//             res.status(200).json({
//                 "success": "new tag created",
//                 "tag": newTag,
//                 "new_tag_id": response
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 "failed": "new tag was not created",
//                 "error": err
//             })
//         })
// })
//UPDATE USER
// server.put('/api/users/:id', (req, res) => {

//     const updateId = req.params.id;
//     const updateName = req.body.name;

//     userDb.update(updateId, {"name": updateName}) //?
//         .then(response => {
            
//             res.send(updateName + ' was updated')
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 "failed": "user was not updated",
//                 "error": err
//             })
//         })
// })

//UPDATE POST
//UPDATE TAGS

//DELETE USER
//DELETE POST
//DELETE TAGS

server.listen(8000, () => console.log('\n ====API RUNNING===\n')) 
