const express = require('express');
const morgan = require('morgan');
const dbpost = require('./data/helpers/postDb');
const dbuser = require('./data/helpers/userDb');
const dbtag = require('./data/helpers/tagDb');
const userRoutes = require('./userRoutes');


const server = express();

server.use(express.json());

server.use('/api/users', userRoutes);


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

next();	
}	


/*server.use('/api/tags',(req, res, next) => {
	let uppercased = req.body.tag.toUpperCase();
        //console.log(uppercased);
        next(uppercased);

});*/


server.use(logger);


server.use(morgan('dev'));

//server.use(upperCase);


function upperCase(req, res, next){
        let uppercased = req.body.tag.toUpperCase();
	req.body.tag = uppercased;
        next();
};



server.get('/', (req, res) => {
        res.send('Testing');
});


server.get('/api/posts', (req, res) => {
        const request = dbpost.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The posts information could not be retrieved."});
        })

});

server.get('/api/tags', (req, res) => {
        const request = dbtag.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The tags information could not be retrieved."});
        })

});


/*server.get('/api/users', (req, res) => {
        const request = dbuser.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The user information could not be retrieved."});
        })

});*/

server.get('/api/tags/:id', (req, res) => {
        const id = req.params.id;

       const request = dbtag.get(id);
	
	if(isNaN(id)){
	res.status(404).json({ error: "Id should be a number" });	
	}

	else{

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The tag with the specified ID does not exist." });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "The tag with the specified ID does not exist."});
        })

	}
});


/*server.get('/api/users/:id', (req, res) => {
        const id = req.params.id;

       const request = dbuser.get(id);

	if(isNaN(id)){
        res.status(404).json({ error: "Id should be a number" });                        
        }

        else{

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The user with the specified ID does not exist." });
         else {
                 response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

	}
});*/

/*server.get('/api/users/:id/posts', (req, res) => {
        const id = req.params.id;

       const request = dbuser.getUserPosts(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The user with the specified ID does not exist." });
         else { 
		 //response.userId = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

});*/




server.get('/api/posts/:id', (req, res) => {
	
	const id = req.params.id;

	if(isNaN(id)){
        res.status(404).json({ error: "Id should be a number" });                        
        }

        else{

       const request = dbpost.get(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The post with the specified ID does not exist." });
         else {
		 response.id = id;
		 res.status(200).json(response);
	 }

        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

	}
});


server.get('/api/posts/:id/tags', (req, res) => {
        const id = req.params.id;

       const request = dbpost.getPostTags(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The post with the specified ID does not exist or there are no tags on this post id." });
         else {
                response.unshift("Tags for the specified posts are:");
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "The post with the specified ID does not exist."});
        })

});



/*server.get('/:id', (req, res) => {
        const id = req.params.id;

       const request = dbuser.getPostTags(id);

        request.then(response => {
        if(response.length==0) res.status(404).json({ error: "The user with the specified ID does not exist." });
         else {
                // response.id = id;
                 res.status(200).json(response);
         }

        })

        .catch(err => {
        res.status(404).json({error: "The user with the specified ID does not exist."});
        })

});*/




server.post('/api/posts', (req, res) => {

        const {text, userId} = req.body;
        const post = {text, userId};

        if (!text || !userId) {
                res.status(400).json({errorMessage: "Please provide text and userId for the post."});
        }
	
	else if(isNaN(parseInt(userId))){
		res.status(400).json({errorMessage: "Please provide a number for userId."});
	}

        else{

        const request = dbpost.insert(post);

        request.then(response => {
                response.text = post.text;
                response.userId = post.userId;
		response.message ="Successfully added a new post";

                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
        })

        }  });



server.post('/api/tags', upperCase, (req, res) => {

        let tag = req.body.tag;
	console.log(req);
        let tagContent = {tag: req.body.tag};

        if (!tag) {
                res.status(400).json({errorMessage: "Please provide text for the tag."});
        }

        else{
	
        const request = dbtag.insert(tagContent);

        request.then(response => {
                let responseObject ={};
		responseObject.tag = tagContent.tag;
                responseObject.message ="Successfully added a new tag";

                res.status(201).json(responseObject);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the tag to the database" });
        })

        }  
});




/*server.post('/users', (req, res) => {

        const {name} = req.body;
        const user = {name};

        if (!name) {
                res.status(400).json({errorMessage: "Please provide a name for the user."});
        }

        else{

        const request = dbuser.insert(user);

        request.then(response => {
                response.name = user.name;
                response.message ="Successfully added a new user";

                res.status(201).json(response);
        })

        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the user to the database" });
        })

        }  });*/




server.delete('/posts/:id', (req, res) => {
        const id = req.params.id;
        const request = dbpost.remove(id);

        request.then(response => {
                if(response===1) {
		let responseObject ={};
		responseObject.message = `Successfully deleted post with id ${id}`;


		res.json(responseObject);
		}	

                else res.status(404).json({ error: "The post with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
        })

  });


server.delete('/tags/:id', (req, res) => {
        const id = req.params.id;
        const request = dbtag.remove(id);

        request.then(response => {
                if(response===1) {
                let responseObject ={};
                responseObject.message = `Successfully deleted tag with id ${id}`;


                res.json(responseObject);
                }

                else res.status(404).json({ error: "The tag with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The tag could not be removed" });
        })

  });


/*server.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const request = dbuser.remove(id);

        request.then(response => {
                if(response===1) {
                let responseObject ={};
                responseObject.message = `Successfully deleted user with id ${id}`;


                res.json(responseObject);
                }

                else res.status(404).json({ error: "The user with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
        })

  });*/



server.put('/posts/:id', (req, res) => {
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
			responseObject.message= `Successfully updated post text with id ${id}`
			res.status(200).json(responseObject);
		}
	})

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the post" });
        })
}	
});


server.put('/tags/:id', (req, res) => {
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
                        responseObject.message= `Successfully updated tag text to ${tag} whose id is ${id}`
                        res.status(200).json(responseObject);
                }
        })

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the tag" });
        })
}
});


/*server.put('/users/:id', (req, res) => {
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
                        responseObject.message= `Successfully updated user name who id is ${id}`
                        res.status(200).json(responseObject);
                }
        })

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the user" });
        })
}

});*/



server.use(function(req, res) {
  res.status(404).send("Wrong path, check url");
});

//server.use(morgan('short'));

server.listen(7000, () => console.log('API running on port 7000'));


