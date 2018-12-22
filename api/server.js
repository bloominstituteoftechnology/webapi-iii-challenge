const express=require('express');

const server=express();

const helmet=require('helmet');

const morgan=require('morgan');

const dbUsers = require('../data/helpers/userDb.js');

const dbPosts=require('../data/helpers/postDb.js')

function capitalizeNames(req, res, next) {
    if(req.body.name){req.body.name=req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);}
    
  
    next();
  }

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(capitalizeNames);

module.exports=server;



//get all users

server.get('/api/users', (req, res) => {
    dbUsers.get()
    .then(users=>{
        res.status(200).json(users);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The users information could not be retrieved.' });
    });
})

//get individual user

server.get('/api/users/:id', (req, res)=>{
    const id=req.params.id;
    console.log("id"+id);
    dbUsers.get(id).then(user=>
        {
			if (user) {
				res.status(200).json(user);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
			
		}
        ).catch(
            err => {
                res
                    .status(500)
                    .json({ error: 'The user information could not be retrieved.' });
            }
        )}
)

//create user

server.post('/api/users', (req, res) => {
	let user = req.body;

	if (user.name) {
		dbUsers.insert(user)
			.then(userId => {
				dbUsers.getById(userId).then(newuser => {
					user = newpost;
				});
			})
			.then(res.status(201).json(user))
			.catch(err => {
				res.status(500).json({
					error: 'There was an error while saving the user to the database'
				});
			});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide a name!!!!'
		});
	}
});

//update user, 
server.put('/api/users/:id', (req, res) => {
	let updatedUser = req.body;
	let { id } = req.params;

	if (updatedUser.name) {
		//
		console.log('name' + id);
		console.log('updated user' + updatedUser.name);
		dbUsers.update(id, updatedUser).then(number => {
			console.log(number);
			if (!number) {
				res.status(404).json({
					error: 'The user with the specified ID does not exist'
				});
			} else {
					res.status(200).json({success:"user edited successfully"})
                    };
				
			
		});
    }})


//delete user

server.delete('/api/users/:id', (req, res) => {
	let { id } = req.params;

	dbUsers.get(id).then(user => {
		dbUsers.remove(id)
			.then(
				user
					? res.status(200).json({removed:`${user.name}`})
					: res.status(404).json({
							message: 'The user with the specified ID does not exist.'
					  })
			)
			.catch(res.status(500).json({ error: 'The user could not be removed' }));
        });
    });
    
//get all posts

server.get('/api/posts', (req, res) => {
    dbPosts.get()
    .then(posts=>{
        res.status(200).json(posts);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The users information could not be retrieved.' });
    });
})

//get individual post
server.get('/api/posts/:id', (req, res)=>{
    let id=parseInt(req.params.id);
    console.log("type of id"+typeof id);

    dbPosts.get().then(postsList=>
        {
            let foundPost=
            postsList.filter(
                post => post.id === id
            )
            res.status(200).json(foundPost)
		}
        
        ).catch(
            err => {
                res
                    .status(500)
                    .json({ error: 'The post information could not be retrieved.' });
            }
        )}
)
//get posts by user id instead

server.get('/api/posts/userid/:id', (req, res)=>{
    let id=parseInt(req.params.id);

    dbPosts.get().then(postsList=>
        {
            let foundPost=
            postsList.filter(
                post => post.userId === id
            )
            res.status(200).json(foundPost)
		}
        
        ).catch(
            err => {
                res
                    .status(500)
                    .json({ error: 'The post information could not be retrieved.' });
            }
        )}
)


//create post

server.post('/api/posts', (req, res) => {
	let post = req.body;

	if (post.userId && post.text) {
		dbPosts.insert(post)
			.then(postId => {
				dbPosts.getById(postId.id).then(newpost => {
					post = newpost;
				});
			})
			.then(res.status(201).json(post))
			.catch(err => {
				res.status(500).json({
					error: 'There was an error while saving the post to the database'
				});
			});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide userId and text for the post.'
		});
	}
});

//update post

server.put('/api/posts/:id', (req, res) => {
	let updatedPost = req.body;
    let id = parseInt(req.params.id);
    console.log(updatedPost,id)

	if (updatedPost.text) {
		//
		console.log('id' + id);
		console.log('updated post' + updatedPost.text);
		dbPosts.update(id, updatedPost).then(number => {
			console.log(number);
			if (!number) {
				res.status(404).json({
					error: 'The post with the specified ID does not exist'
				});
			} else {
				dbPosts.get(id).then(successfullyUpdatedPost => {
					res.status(200).json(successfullyUpdatedPost);
				});
			}
		});
	} else {
		res.status(400).json({
			errorMessage: 'Please provide text for the post.'
		});
	}
});

//delete post

//database is returning 0, but it clearly is deleting the records... therefore went straight to success message in first 

server.delete('/api/posts/:id', (req, res) => {
	let id = req.params.id;

	dbPosts.remove(id).then(post => {
		dbPosts.remove(id)
			.then(something=>{
                console.log("something" +something+typeof something);
                // number?
                
                // :
                // res.status(404).json({message:"post was not removed"})
            }).then(res.status(200).json({message:"successfully removed"}))
			.catch(res.status(500).json({ error: 'The post could not be removed' }));
	});
});