const express = require('express');
const dbuser = require('./data/helpers/userDb');
const router = express.Router();



router.get('/', (req, res) => {
        const request = dbuser.get();

        request.then(response => {
        res.status(200).json(response);
        })

        .catch(err => {
        res.status(404).json({error: "The user information could not be retrieved."});
        })

});


router.get('/:id', (req, res) => {
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
});



router.get('/:id/posts', (req, res) => {
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

});

router.post('/', (req, res) => {

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

        }  });


router.delete('/:id', (req, res) => {
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

  });


router.put('/:id', (req, res) => {
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
                        responseObject.message= `Successfully updated user name to ${name} whose id is ${id}`
                        res.status(200).json(responseObject);
                }
        })

        .catch(error => {
        res.status(500).json({ message: "Couldn't update the user" });
        })
}

});




module.exports = router;
