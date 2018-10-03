const express = require('express');
const dbUsers = require('./data/helpers/userDb.js')
const dbPosts = require('./data/helpers/postDb.js')
const server = express();

logger = (req, res, next) => {
    console.log(`${req.method} to ${req.url}`)
    next();
}

server.use(logger);
server.use(express.json());

uppercase = (req, res, next) => {
	req.body.name =
		req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
	next();
}

server.get('/', (req, res) =>{
    res.send('running')
})

server.get('/users', async (req, res) => {
    try{
        const users = await dbUsers.get();
        if (users.length > 0){
            res.status(200).json(users);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The User information could not be retrieved."})
    }
});

server.get('/users/:id', async (req, res) => {
    try {
        const user = await dbUsers.get(req.params.id);
        if (user) {
            return res.status(200).json(user);
        } 
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The User information could not be retrieved."})
    }
})

server.post('/users', uppercase, async (req, res) => {
    try{
        if (req.body.name){
            const user = await dbUsers.insert(req.body);
            return res.status(200).json(user);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The User information could not be retrieved."})
    } 
})

server.put('/users/:id', uppercase, async (req, res) => {
    if (!req.body.name) {
        return status(400).json({ message: 'Please input a name.' })
    }        
    try { 
        const user = await dbUsers.update(req.params.id, req.body);       
        if (req.body.name) {
            
            return res.status(200).json(user);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The User information could not be retrieved."})
    } 
})

server.delete("/users/:id", async (req, res) => {
	try {
		let user = await dbUsers.remove(req.params.id);
		if (user) {
			return res.status(200).json(user);
        }
        return res.status(404).json({
            message: "Information not found"
        })
	} catch (err) {
        res.status(500).json({ error: "The User information could not be retrieved."})
    } 
});

//=========POSTS

server.get('/posts', async (req, res) => {
    try{
        const posts = await dbPosts.get();
        if (posts.length > 0){
            res.status(200).json(posts);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The Post information could not be retrieved."})
    }
});

server.get('/posts/:id', async (req, res) => {
    try {
        const post = await dbPosts.get(req.params.id);
        if (post) {
            return res.status(200).json(post);
        } 
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The Post information could not be retrieved."})
    }
})

server.post('/posts', async (req, res) => {
    try{
        if (req.body){
            const post = await dbPosts.insert(req.body);
            return res.status(200).json(post);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The Post information could not be retrieved."})
    } 
})

server.put('/posts/:id', async (req, res) => {
    if (!req.body) {
        return status(400).json({ message: 'Please input a name.' })
    }        
    try { 
        const post = await dbPosts.update(req.params.id, req.body.name);       
        if (req.body.name) {
            
            return res.status(200).json(post);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "The Post information could not be retrieved."})
    } 
})

server.delete("/posts/:id", async (req, res) => {
	try {
		let post = await dbPosts.remove(req.params.id);
		if (post) {
			return res.status(200).json(post);
        }
        return res.status(404).json({
            message: "Information not found"
        })
	} catch (err) {
        res.status(500).json({ error: "The Post information could not be retrieved."})
    } 
});

server.listen(5000, () =>     
    console.log(`server is listening on port 5000`));