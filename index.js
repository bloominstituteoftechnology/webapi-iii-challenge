// ASSIGNMENT: Use Node.js and Express to design and build an API that performs CRUD operations on users, posts and post tags. Write custom middleware to ensure that the tags are uppercased before they are processed by the request handlers.

//Q????: Configure an npm script named "start" that will execute your code using nodemon so that the server restarts on changes. Make nodemon be a development time dependency only, it shouldn't be deployed to production.
//Q????? Why am I able to run this code without having installed the express dependencies?

const express = require('express');
const server = express();
server.use(express.json());
 
let postDb = require('./data/helpers/postDb');
let tagDb = require('./data/helpers/tagDb');
let userDb = require('./data/helpers/userDb');

//==== CUSTOM MIDDLEWARE: UPPERCASING TAGS  ===== //
//Write custom middleware to ensure that the tags are uppercased before they are processed by the request handlers.
// The point of this exercise is to get us used to writing middleware for sanitizing/conditioning data we store or work with in our databases. 

// So, for any CRUD operation which involves handling of a tag, capitalize the tag, correct?
function upperCaseTag(tag) {
    tag = tag.toUpperCase();
    return tag
}

 



// ================================== POSTS ================================ //

// *****GET******
//get(): calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if found.
// so this one only returns the post id, text, and userId, while the get w/ :id returns the post text, postedBy, and tags (not id)...hmmm...
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            return res.json(posts) 
        })
        .catch(err => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb.get(id)
        .then(post => {
            return res.json(post);
        })
        .catch(err => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})

// *****INSERT (i.e. POST) ******//

//insert(): calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: { id: 123 }.


// NOTE: THE ONE BELOW IS FROM SOLUTION BRANCH, BUT DOESN"T WORK WHEN I TRY IT...
// server.post('/api/posts', (req,res) => {
//     const newPostUserId = req.body.userId;
//     const newPostText = req.body.text;
//     postDb.insert({newPostUserId,newPostText})
//         .then(newPost => {
//             return res.send(newPost);
//         })
//         .catch(err => {
//             return res.status(500).json({error: "POST/INSERT ERROR!!!"});
//         })
// })

server.post('/api/posts', (req,res) => {
    const newPost = req.body;
    postDb.insert(newPost)
        .then(newPost => {
            return res.send(newPost);
        })
        .catch(err => {
            return res.status(500).json({error: "POST/INSERT ERROR!!!"});
        })
})

// ************** UPDATE (i.e. PUT) ***************** //
//update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.


// NOTE: THIS WORKS. CONSIDER SENDING THE REVISED POST BACK TO THE USER AFTER UPDATING.
server.put('/api/posts/:id', (req,res) => {
    const id = req.params.id;
    const revisedPost = req.body;
    postDb.update(id, revisedPost)
        .then(count => {
            return res.json(count)
        })
        .catch(count => {
            return res.status(500).json({error: "UPDATE/PUT ERROR!!!"})
        })
})

// ************** REMOVE (i.e. DELETE) ***************** //
// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

// THIS WORKS. CONSIDER SENDING USER A MEESSAGE OR SOMETHING SAYING THAT THE POST WAS SUCCESSFULLY DELETED.
server.delete('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    postDb.remove(id)
        .then(id => {
            return res.json(id)
        })
        .catch(id => {
            return res.status(500).json({error: "Error DELETING!!!!"})
        })
})





// ================================== USERS ================================ //

// *****GET******
//get(): calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if found.
// so this one only returns the post id, text, and userId, while the get w/ :id returns the post text, postedBy, and tags (not id)...hmmm...

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(users => {
            return res.send(users) 
        })
        .catch(users => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})






// ======================================= TAGS ============================================= //
server.get('/api/tags', (req, res) => {
    tagDb.get()
        .then(tags => {
            return res.send(tags) 
        })
        .catch(tags => {
            return res.status(500).json({ error: "There was an error while getting the posts from the database" }); //doublecheck to make sure this error code # and string is correct
        })
})




// We use the .listen() method to have the express server monitor a port on the computer for any incoming connections and respond to those we have configured. 
server.listen(8000, () => console.log('API running on port 8000'));