const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

//just to make sure the server is working
server.get('/', (req, res) => {
	res.send('Hello, Kelly');
})

//****************postDb-crud****************************
// honestly, I mostly copied this from yesterday and updated it with the correct info for this project

server.post('/api/posts', (req,res) => {
	if (!req.body.userId || !req.body.text) {
		res.status(400);
		res.json({ errorMessage: "Please provide userId and text for the post." });
	}
	else {

	const { text, userId } = req.body;
	posts.insert({ text, userId })
		.then(response => {
			res.status(201);
			posts.get(response.id)
				.then(posts => {
					res.json({ posts });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the post to the database."});
			})
	}
})

server.get('/api/posts', (req, res) => {
	posts.get().then(posts => {
		res.json({ posts });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved."});
		})
});

server.get('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	posts.get(req.params.id).then(posts => {
		if (posts) {
			res.json({ posts });
		}
		else {
			res.status(404);
			res.json({ message: " The post with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post information could not be retrieved." });
		})
});

// retrieve list of posts with a particular tag name

server.get('/api/posts/:id/tags', (req, res) => {
	const id = req.params.id;
	posts.getPostTags(id)
		.then(tagList => {
			if (tagList.length) res.json({ tagList });
			else {
				res.status(404);
				res.json({ errorMessage: "No tags found." });
			}
		})
		.catch(error => {
			res.status(500);
			res.json({ errorMessage: "No tag could be retrieved." });
		})
});


server.put('/api/posts/:id', (req, res) => {
	const { text, userId } = req.body;
	const id = req.params.id;

	if (!userId || !text) {
		res.status(400);
		res.json({ errorMessage: "Please provide the author and text for the post." });
	}
	else {
		posts.update( id, { text, userId } ).then(success => {
			if (success) {
				res.status(200);
				posts.get(id)
					.then(posts => {
						res.json({ posts });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The post with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The post could not be found." });
			})
}
})

// I worked on my delete since I just realized that it is supposed to display what you deleted and not just the fact that deleting was successful. Zach helped me on this by explaining that you have to get the post first so you have the info and then delete it.

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params

	posts.get(id)
		.then((post) => {
			let deletedPost = post
			posts.remove(id).then(success => {
				if (success) {
					res.status(200);
					res.json({ deletedPost });
				}
				else {
					res.status(404);
					res.json({ message: "The post with the specified ID does not exist." })
				}
		})
		.catch(error => {
			res.status(500);
			res.json({ error: "The post could not be removed." });
			})
		})
})

// **********userDb-crud*******************************************
// This is basically just like above. At some point I would like to figure out how to put these in separate files and call them from somewhere because the number of lines in this file is kind of ridiculous. Sorry.

server.post('/api/users', (req,res) => {
	if (!req.body.name) {
		res.status(400);
		res.json({ errorMessage: "Please provide user name." });
	}
	else {

	const { name } = req.body;
	users.insert({ name })
		.then(response => {
			res.status(201);
			users.get(response.id)
				.then(users => {
					res.json({ users });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the user to the database."});
			})
	}
})

server.get('/api/users', (req, res) => {
	users.get().then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user information could not be retrieved."});
		})
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	users.get(req.params.id).then(users => {
		if (users) {
			res.json({ users });
		}
		else {
			res.status(404);
			res.json({ message: " The user with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user information could not be retrieved." });
		})
});

// retrieve posts by user

server.get('/api/users/:id/posts', (req, res) => {
	const id = req.params.id;
	users.getUserPosts(id)
		.then(postList => {
			if (postList.length) res.json({ postList });
			else {
				res.status(404);
				res.json({ errorMessage: "No posts found for this user." });
			}
	})
		.catch(error => {
			res.status(500);
			res.json({ errorMessage: "The posts could not be retrieved." });
		})
})

server.put('/api/users/:id', (req, res) => {
	const { name } = req.body;
	const id = req.params.id;

	if (!name) {
		res.status(400);
		res.json({ errorMessage: "Please provide the name for the user." });
	}
	else {
		users.update( id, { name } ).then(success => {
			if (success) {
				res.status(200);
				users.get(id)
					.then(users => {
						res.json({ users });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The user with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The user could not be found." });
			})
}
})

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	users.get(id)
		.then((user) => {
			let deletedUser = user
			users.remove(id).then(success => {
				if (success) {
					res.status(200);
					res.json({ deletedUser });
				}
				else {
					res.status(404);
					res.json({ message: "The user with the specified ID does not exist." })
				}
		})
		.catch(error => {
			res.status(500);
			res.json({ error: "The user could not be removed." });
			})
	})

})
//**********************tagDb-crud************************
//this is also similar to CRUD operations for post and users
//just noticed that we needed to ensure that the tags are upper-cased before being processed so I'm trying to write that in now.

server.post('/api/tags', (req,res) => {
	let { tag } = req.body
	tag = tag.toUpperCase()
	if (!tag) {
		res.status(400);
		res.json({ errorMessage: "Please provide a name for the tag." });
	}
	else {

	tags.insert({ tag })
		.then(response => {
			res.status(201);
			tags.get(response.id)
				.then(tags => {
					res.json({ tags });
				});
		})
			.catch(error => {
				res.status(500);
				res.json({ error: "There was an error saving the tag to the database."});
			})
	}
})

server.get('/api/tags', function (req, res, next) {
	console.log('middleware')
	next()
})

server.get('/api/tags', (req, res) => {
	tags.get().then(tags => {
		res.json({ tags });
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag information could not be retrieved."});
		})
});

server.get('/api/tags/:id', (req, res) => {
	const { id } = req.params;
	tags.get(req.params.id).then(tags => {
		if (tags) {
			res.json({ tags });
		}
		else {
			res.status(404);
			res.json({ message: " The tag with the specified ID does not exist." });
		}
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag information could not be retrieved." });
		})
});

server.put('/api/tags/:id', (req, res) => {
	const { tag } = req.body;
	const id = req.params.id;

	if (!tag) {
		res.status(400);
		res.json({ errorMessage: "Please provide tag name." });
	}
	else {
		tags.update( id, { tag } ).then(success => {
			if (success) {
				res.status(200);
				tags.get(id)
					.then(tags => {
						res.json({ tags });
			});
		}

			else {
				res.status(404);
				res.json({ message: "The tag with the specified ID does not exist." });
			}
		}
		)
			.catch(error => {
				res.status(500);
				res.json({ error: "The tag could not be found." });
			})
}
})

server.delete('/api/tags/:id', (req, res) => {
	const { id } = req.params;
	tags.get(id)
		.then((tag) => {
			let deletedTag = tag
			tags.remove(id).then(success => {
				if (success) {
					res.status(200);
					res.json({ deletedTag });
				}
				else {
					res.status(404);
					res.json({ message: "The tag with the specified ID does not exist." })
				}
			})
		.catch(error => {
			res.status(500);
			res.json({ error: "The tag could not be removed." });
			})
		})
})

server.listen(port, () => console.log(`Server running on port ${port}`));
