const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

function upperUser(req, res, next){
	if (!req.body || !req.body.name){
		res.status(422).json({ message: 'A user needs a name' })
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
		user
		? res.status(200).json(user)
		: res.status(404).json({ message: 'Specified user could not be found' })
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data' });
	}
});

app.get('/users/:id/posts', async (req, res) => {
	const { id } = req.params;
	try {
		const posts = await userDB.getUserPosts(id);
		posts.length > 0
		? res.status(200).json(posts)
		: res.status(404).json({ message: 'User does not have posts' })
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data' });
	}
});

app.post('/users', upperUser, async (req, res) => {
	const { name } = req.body;
	try {
		const count = await userDB.insert({name});
		res.status(201).json({ message: 'User successfully added' });
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server '})
	}
});

app.put('/users/:id', upperUser, async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const count = await userDB.update(id, {name});
		count > 0
		? res.status(200).json({ message: 'User successfully updated' })
		: res.status(404).json({ message: 'Specified user could not be found '})
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server '})
	}
});

app.delete('/users/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const count = await userDB.remove(id);
		count > 0
		? res.status(200).json({ message: 'User successfully deleted' })
		: res.status(404).json({ message: 'Specified user could not be found '})
	}
	catch(err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong in our server '});
	}
 });

app.get('/posts', async (req, res) => {
	try {
		const posts = await postDB.get();
		res.status(200).json(posts);
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data' });
	}
});

app.get('/posts/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await postDB.get(id);
		post
		? res.status(200).json(post)
		: res.status(404).json({ message: 'Specified post could not be found '})
	}
	catch(err) {
		res.status(500).json({ message: 'Error getting the data' });
	}
});

app.post('/posts', async (req, res) => {
	const { userId, text } = req.body;
	try {
		const count = await postDB.insert({userId, text});
		res.status(201).json({ message: 'Post successfully added' });
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server '})
	}
});

app.put('/posts/:id', async (req, res) => {
	const { id } = req.params
	const { userId, text } = req.body;
	try {
		const count = await postDB.update(id, {userId, text});
		count > 0
		? res.status(200).json({ message: 'Post successfully updated' })
		: res.status(404).json({ message: 'Specified post could not be found' })
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server' })
	}
});

app.delete('/posts/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const count = await postDB.remove(id);
		count > 0
		? res.status(200).json({ message: 'Post successfully deleted' })
		: res.status(404).json({ message: 'Specified post could not be found' })
	}
	catch(err) {
		res.status(500).json({ message: 'Something went wrong in our server' })
	}
})

app.listen(9000, () => console.log('===server is running on port 9000==='));