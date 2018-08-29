const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const app = express();

app.use(express.json());

function upperUser(req, res, next){
	if (!req.body || !req.body.name){
		res.status(422).json({ message: 'A user needs a name'})
	} else {
		req.body.name = req.body.name[0].toUpperCase() + req.body.name.substr(1, req.body.name.length-1);
		next();
	}
}

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/users', async (req, res) => {
	try {
		const users = await userDB.get();
		res.status(200).json(users);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data'});
	}
});

app.get('/users/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await userDB.get(id);
		res.status(200).json(user);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data'});
	}
});

app.get('/users/:id/posts', async (req, res) => {
	const { id } = req.params;
	try {
		const posts = await userDB.getUserPosts(id);
		res.status(200).json(posts);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data'});
	}
});

app.get('/posts', async (req, res) => {
	try {
		const posts = await postDB.get();
		res.status(200).json(posts);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data'});
	}
});

app.get('/posts/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await postDB.get(id);
		res.status(200).json(post);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data'});
	}
});

app.post('/users', upperUser, async (req,res) => {
	const { name } = req.body;
	try {
		const count = await userDB.insert({name});
		res.status(201).json({message: 'User successfully added'});
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server '})
	}
});


// app.post('/users', async (req, res) => {
// 	const user = req.body;
// 	if (!user.name || !user.bio){
// 		res.status(422).json({ message: 'A user needs both a name and a bio'});
// 	}
// 	try {
// 		const response = await db.insert({name: user.name, bio: user.bio});
// 		res.status(201).json({ message: 'User successfully created '});
// 	} 
// 	catch(err) {
// 		console.log(err);
// 		res.status(500).json({ message: 'Something went wrong in our server '});
// 	}
// })

app.listen(9000, () => console.log('===server is running on port 9000==='));