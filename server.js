const express = require('express');
const port = 5555;
const server = express();

const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');


server.use(express.json());

//make sure server is working
server.get('/', (req, res) => {
	res.send('hello from express');
})

//gets the user list
server.get('/api/users', (req, res) => {
	users
	.get()
	.then(users => {
		res.status(200).json({ users })
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({error: "the users information could not be recieved"})
	})
})

// server.get('')

// server.get('/api/posts', (req, res) => {
// 	db
// 	.find()
// 	.then(posts => {
// 		res.status(200).json({ posts })
// 	})
// 	.catch(error => {
// 		console.log(error)
// 		res.status(500).json({ error: "The posts information could not be retrieved." })
// 	});
// })


// server.post('/api/posts', (req, res) => {
// 	const {title, contents} = req.body;
// 	if (!req.body.title || !req.body.contents){
// 		res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
// 	} else {
// 		db
// 		.insert({title, contents}).then(response => {
// 			res.status(201).json(response)
// 		})
// 		.catch(error => {
// 			console.log(error)
// 			res.status(500).json({ error: "There was an error while saving the post to the database" })
// 		})
// 	}
// });


server.listen(port, () => console.log(`server running on port ${port}`));
