// import node modules
const express = require('express');
const db = require('../data/helpers/tagDb');
const router = express.Router();

//GET (retrieve tag) //Postman test ok: http://localhost:5000/api/tags
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    //If there's an error in retrieving the tag from the database
    .catch(err => {
        res.status(500).json({ error: 'Tag info could not be retrieved.' })
    });
});

//GET (retrieve tag by id) //Postman test ok: http://localhost:5000/api/tags/2
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The specified Tag ID does not exist.' })
        } else {
            res.json(posts);
        }
    })
        //If there's an error in retrieving the tag from the database
        .catch(err => {
            res.status(500).json({ error: 'The Tag info could not be retrieved.' })
        });
    });
    
//POST (add tag) //Postman test ok: http://localhost:5000/api/tags/ 
    router.post('/', (req, res) => {
        const {tag} = req.body;
        const newTag = {tag};
            if (req.body.length === 0) {
                res.status(404).json({ message: 'The specified Tag does not exist.' })
            } else 
            db
            .insert(newTag)
            .then(post => {
                res.status(201).json(post);
            })
            //If there's an error in retrieving the tag from the database
            .catch(err => {
                res.status(500).json({ error: 'There was an error saving to the database.' })
            });
    });

//DELETE (delete tag) //Postman test ok: http://localhost:5000/api/tags/15
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: 'The specified Tag does not exist.' })
    } else
    db
    .remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    //If there's an error in retrieving the tag from the database
    .catch(err => {
        res.status(500).json({ error: 'Tag could not be removed.' })
    });
});

//PUT (update tag) //Postman test ok: http://localhost:5000/api/tags/2 
router.put('/:id', (req, res) => {
    const {tag} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ msg: 'Specified Tag ID does not exist.' })
    }
    if(req.body.length === 0) {
        res.status(400).json({ errorMsg: 'Provide Tag.' })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    //If there's an error in retrieving the tag from the database
    .catch(err => {
        res.status(500).json({ errorMsg: 'Tag could not be modified.' })
    });
});


//module export
module.exports = router;