const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
//----- MIDDLEWARE ---------
const makeUppercase = require('../middleware/makeUppercase.js');
server.use(express.json());
server.use(helmet());
server.use(morgan('short')); 

/*
_____Posts_____
id: number, no need to provide it when creating posts, the database will automatically generate it.
userId: number, required, must be the id of an existing user.
text: string, no size limit, required.
*/

//********************** USER CRUD **********************// 

//----- GET users -----

 server.get('/api/users', (req, res) => {
    userDb.get() 
    .then(users=> { 
      res.status(200).json(users);
    }) 
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params; 
    userDb.get(id)
      .then(user => { 
        console.log(user)
        if (!user) { 
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        return  
        } else if (user){ 
        res.status(200).json(user);
        return  
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
//----- POST users -----

server.post('/api/users', makeUppercase, async (req, res) => {
    const userData = req.body;
    if (!userData.name || userData.name==="" ) {
        const errorMessage = "Please provide name for the user"; 
        res.status(400).json({ errorMessage});
        return
    }   
    //!!!!_____need to add character length conditional_____
    try {
        await userDb.insert(userData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json({message: "user was added to database" });
    return
});
//----- PUT users -----
server.put('/api/users/:id', makeUppercase, async (req, res) => {
    const { id } = req.params;
    const userChanges = req.body;
    userDb.get(id)
        .then(user => { 
    //!!!!_____need to add character length conditional_____ 
        if (!user) { 
           res.status(404).json({ message: "The user with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
         });
          
        if (!userChanges.name || userChanges.name==="" ) {
          const errorMessage = "Please provide name for the user"; 
          res.status(400).json({ errorMessage });
          return
        } 
        try {
          await userDb.update(id, userChanges)
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
        return      
      }
      res.status(201).json({message: "user was updated" });
      return
      });
//----- DELETE users -----
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
   // userDb.get(id)
   userDb.remove(id)
   .then(count => res.status(200).json(count))
    // .then(user => { 
     // console.log("we're in then")
        //  if (!user) { 
        //  res.status(404).json({ message: "The post with the specified ID does not exist." });
        /*  return
       } else if (user){ // or oops - if we could retrieve it, we would but it's not here, status 404
        userDb.remove(user.id) 
         res.status(200).json({ message: "The post with the specified ID was deleted." });
         return
       }
        })*/
        .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
        //res.status(200).json({ message: "The post with the specified ID was deleted." });
      });

//**********************  POST CRUD ********************** // 

//----- GET posts -----

server.get('/api/posts', (req, res) => {
    postDb.get() 
    .then(posts=> { 
      res.status(200).json(posts);
    }) 
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; 
    userDb.getUserPosts(id)
      .then(post => { 
        console.log(post)
        if (!post) { 
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        return  
        } else if (post){ 
        res.status(200).json(post);
        return  
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
//----- POST posts -----

server.post('/api/users', makeUppercase, async (req, res) => {
    const userData = req.body;
    if (!userData.name || userData.name==="" ) {
        const errorMessage = "Please provide name for the user"; 
        res.status(400).json({ errorMessage});
        return
    }   
    try {
        await userDb.insert(userData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json({message: "user was added to database" });
    return
});
//----- PUT posts -----
server.put('/api/users/:id', makeUppercase, async (req, res) => {
    const { id } = req.params;
    const userChanges = req.body;
    userDb.get(id)
        .then(user => { 
        if (!user) { 
           res.status(404).json({ message: "The user with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
         });
          
        if (!userChanges.name || userChanges.name==="" ) {
          const errorMessage = "Please provide name for the user"; 
          res.status(400).json({ errorMessage });
          return
        } 
        try {
          await userDb.update(id, userChanges)
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
        return      
      }
      res.status(201).json({message: "user was updated" });
      return
      });
//----- DELETE posts -----
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
   // userDb.get(id)
   userDb.remove(id)
   .then(count => res.status(200).json(count))
    // .then(user => { 
     // console.log("we're in then")
        //  if (!user) { 
        //  res.status(404).json({ message: "The post with the specified ID does not exist." });
        /*  return
       } else if (user){ // or oops - if we could retrieve it, we would but it's not here, status 404
        userDb.remove(user.id) 
         res.status(200).json({ message: "The post with the specified ID was deleted." });
         return
       }
        })*/
        .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
        //res.status(200).json({ message: "The post with the specified ID was deleted." });
      });
module.exports = server;
  
