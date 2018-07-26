// import your node modules
const express = require('express');
const dbuser = require('./data/helpers/userDb');
const dbpost = require('./data/helpers/postDb');
const dbtag = require('./data/helpers/tagDb');


const server = express();
const port = 8000;

//middleware
server.use(express.json());
// server.use(helmet());
// server.use(cors({ origin: 'http://localhost:3000' }));

//router handlers
server.get('/', (req, res) => {

  res.send('Hello World <h1> this is a blog app</h1>');
});

//User Endpoints - router handlers
server.get('/api_v1/users', (req, res) => {
        const request = dbuser.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve users from the database...  try again."});
        })

});

//posts Endpoints
server.get('/api_v1/posts', (req, res) => {
        const request = dbpost.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve posts from the database...  try again."});
        })

});

//tags Endpoints
server.get('/api_v1/tags', (req, res) => {
        const request = dbtag.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve tags from the database...  try again."});
        })

});

//user by id Endpoints
server.get('/api_v1/users/:id', (req, res) => {
        const id = req.params.id;

       const request = dbuser.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve user with specified id" });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve user with specified id"});
        })

});

//posts by id Endpoints
server.get('/api_v1/posts/:id', (req, res) => {
	
	const id = req.params.id;

       const request = dbpost.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve post with specified id" });
         else {
		 response.id = id;
	 res.status(200).json(response);
	 }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve post with specified id"});
        })

});

//tag by id Endpoints
server.get('/api_v1/tags/:id', (req, res) => {
        const id = req.params.id;

       const request = dbtag.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "Unable to retrieve tag with specified id" });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "Unable to retrieve tag with specified id"});
        })

});





//tags associated with a post id Endpoints
server.get('/api_v1/post_tags/:id', (req, res) => {
        const id = req.params.id;

       const request = dbpost.getPostTags(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "no tag associated with this post id" });
         else {
                // response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "no tags associated with this post id"});
        })

});

//posts associated with a user id Endpoints
server.get('/api_v1/user_posts/:id', (req, res) => {
        const id = req.params.id;

       const request = dbuser.getUserPosts(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "no post associated with this user id" });
         else {
                // response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "no post associated with this user id"});
        })

});

//adding a post  Endpoints
server.post('/api_v1/add_post', (req, res) => {

        const {text, userId} = req.body;
        const post = {text, userId};

        if (!text || !userId) {
                res.status(400).json({errorMessage: "text and userId are required for the post."});
        }

        else{

        const request = dbpost.insert(post);

        request.then(response => {
                response.text = post.text;
                response.userId = post.userId;
		response.message ="Success: added a new post";

                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
        })

        }  });


//adding a tag  Endpoints
server.post('/api_v1/add_tag', (req, res) => {

        const {tag} = req.body;
        const tagContent = {tag};

        if (!tag) {
                res.status(400).json({errorMessage: "text is required for the tag."});
        }

        else{

        const request = dbtag.insert(tagContent);

        request.then(response => {
                let responseObject ={};
		responseObject.tag = tagContent.tag;
                responseObject.message ="Success: added a new tag";

                res.status(201).json(responseObject);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the tag to the database" });
        })

        }  
});



//posting user  Endpoints
server.post('/api_v1/add_user', (req, res) => {

        const {name} = req.body;
        const user = {name};

        if (!name) {
                res.status(400).json({errorMessage: "name is required for the user."});
        }

        else{

        const request = dbuser.insert(user);

        request.then(response => {
                response.name = user.name;
                response.message ="Success: added a new user";

                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
        })

        }  });




//deleting post by id Endpoints
server.delete('/api_v1/delete_post/:id', (req, res) => {
        const id = req.params.id;
        const request = dbpost.remove(id);

        request.then(response => {
                if(response===1) {
		let responseObject ={};
		responseObject.message = `Success: deleted post with id ${id}`;


		res.json(responseObject);
		}	

                else res.status(404).json({ error: "The post with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
        })

  });


//deleting tag by id Endpoints
server.delete('/api_v1/delete_tag/:id', (req, res) => {
        const id = req.params.id;
        const request = dbtag.remove(id);

        request.then(response => {
                if(response===1) {
                let responseObject ={};
                responseObject.message = `Success: deleted tag with id ${id}`;


                res.json(responseObject);
                }

                else res.status(404).json({ error: "The tag with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The tag could not be removed" });
        })

  });


//deleting user by id Endpoints
server.delete('/api_v1/delete_user/:id', (req, res) => {
        const id = req.params.id;
        const request = dbuser.remove(id);

        request.then(response => {
                if(response===1) {
                let responseObject ={};
                responseObject.message = `Success: deleted user with id ${id}`;


                res.json(responseObject);
                }


                else res.status(404).json({ error: "The user with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
        })

  });



//updating existing_post by id Endpoints
server.put('/api_v1/update_post/:id', (req, res) => {
  const { text} = req.body;

  const id =  req.params.id;
  const post = {text};


if (!text) {
                res.status(400).json({errorMessage: "Please provide text for the post."});
}

else{
 const request = dbpost.update(id, post);


        request.then(response => {
                if(response===0)  res.status(404).json({ message: "The post with the specified ID does not exist." });
                else{ 
			let responseObject ={};
			responseObject.message= `Success: updated post text with id ${id}`
			res.status(200).json(responseObject);
		}
	})

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the post" });
        })
}	
});


//updating existing_tag by id Endpoints
server.put('/api_v1/update_tag/:id', (req, res) => {
  const {tag} = req.body;

  const id =  req.params.id;
  const tagContent = {tag};


if (!tag) {
                res.status(400).json({errorMessage: "Please provide text for the tag."});
}

else{
 const request = dbtag.update(id, tagContent);


        request.then(response => {
                if(response===0)  res.status(404).json({ message: "The tag with the specified ID does not exist." });
                else{
                        let responseObject ={};
                        responseObject.message= `Success: updated tag text to ${tag} whose id is ${id}`
                        res.status(200).json(responseObject);
                }
        })

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the tag" });
        })
}
});


//updating existing_user by id Endpoints
server.put('/api_v1/update_user/:id', (req, res) => {
  const {name} = req.body;

  const id =  req.params.id;
  const user = {name};


if (!name) {
                res.status(400).json({errorMessage: "Please provide a name for the user."});
}

else {
 const request = dbuser.update(id, user);


        request.then(response => {
                if(response===0)  res.status(404).json({ message: "The user with the specified ID does not exist." });
                else{
                        let responseObject ={};
                        responseObject.message= `Success: updated user name who id is ${id}`
                        res.status(200).json(responseObject);
                }
        })

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the user" });
        })
}

});



// add your server code starting here
server.listen(port, () => console.log(`API listening on port ${port} ==> remember: error messages and comments are very important`));