const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');


router.get('/', (req, res) => {

    userDb.get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    userDb.get(id)
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    userDb.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
    const user = req.body;

    userDb.insert(user)
    .then(users => res.status(200).json(`Hello ${user.name}`))
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
	const { name } = req.body;

    if(name < 1 || name > 128 ) {
        return res.error(400).json({error: 'Please enter a name under 128 characters and at least 1 character long.'});
    }

    const user = req.body;

    userDb.update(id, user)
    .then(userId => {
      if (userId === 0) => res.status(404).json({message: 'The user does not exist.'});
      });

    userDb.get(id)
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
    .then(user => {
    	if (user === 0) => return res.error(404).json({message: 'The user does not exist.'})
        } else {
    		res.status(200).json(user)})
    .catch(error => res.status(500).json(error));
});


module.exports = router;
