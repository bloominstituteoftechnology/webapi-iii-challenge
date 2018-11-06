const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// const cors = require('cors');
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');
const tagDB = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
// server.use(cors());

server.get('/', (req, res) => {
	res.json('alive');
});

// get all posts
server.get('/api/posts/', (req, res) => {
	postDB
		.get()
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => err.status(500).json({ message: "Can't retrieve post data!!" }));
});

// get post by id
server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	postDB.get(id).then((post) => {
		post.length <= 0 ? res.status(404).json({ message: 'That post was not found' }) : res.status(200).json(post);
	});
});

// get post by tag
// server.get('/posts/search', (req, res) => {
// 	const { id } = req.query;

// 	id ? tagDB.get(id).then((posts) => res.send(posts)) : debug.find().then((posts) => res.send(posts));
// });
// const port = 9000;
// server.listen(port, () => console.log(`The port is OVER ${port}!!`));
