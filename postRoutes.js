const express = require('express');
const dbpost = require('./data/helpers/postDb');

const postRouter = express.Router();



postRouter.get('/', (req, res) => {
        const request = dbpost.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The posts information could not be retrieved."});
        })

});


postRouter.get('/:id', (req, res) => {

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


postRouter.get('/:id/tags', (req, res) => {
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

postRouter.post('/', (req, res) => {

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


postRouter.delete('/:id', (req, res) => {
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

postRouter.put('/:id', (req, res) => {
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


module.exports = postRouter;
