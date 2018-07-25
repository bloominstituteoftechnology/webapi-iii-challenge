const express = require('express');
const helmet = require('helmet');
const post = require('./data/helpers/postDb.js');
const tag = require('./data/helpers/tagDb.js');
const user = require('./data/helpers/userDb.js');

const server = express()

server.listen(8000, () => console.log('API running on port 8000'))


server.use(express.json())
server.use(helmet())

server.get('/posts', async (req, res) => {
    try{
        const posts = await post.get()
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({ "error": "The posts information could not be retrieved"})
    }
})

server.get('/posts/:id', async (req,res) => {
    let { id } = req.params
    try{
        const postIn = await post.get(id)
        res.status(200).json(postIn)
    }catch(err){
        res.status(400).json({ "error": "The posts information for that ID could not be found"})
    }
})

server.post('/posts', async (req, res) => {
    const { text, postedBy, tags } = req.body
    
    if(!text || !postedBy || tags.length < 1){
        res.status(400).json({ "error": "Please include some text, posted By and at least one tag"})
    }
    
    try{
        const postOut = {...req.body}
        const response = await post.insert(postOut)
        res.status(200).json(response)
    }catch(err){
        res.status(500).json({ "error": "Error inserting post into database"})
    }
})

// server.put('/posts/:id', async (req, res) => {
//     const { title, contents } = req.body
//     const { id } = req.params
//     let post = await db.findById(id);

//     if(!title || !contents){
//         res.status(400).json({ "errorMessage": "Please provide title and contents for the post." })
//     }
//     if(post.length < 1){
//         res.status(404).json({ "errorMessage": "The post with the specified ID does not exist." })
//     }

//     try{
//         post = post[0];
//         post["title"] = title;
//         post["contents"] = contents;
//         post["updated_at"] = Date.now();
//         await db.update(id, post);  
//         res.status(200).send(post)
//     }catch(err) {
//         res.status(500).json({ error: "The post information could not be modified." })
//     }
// })