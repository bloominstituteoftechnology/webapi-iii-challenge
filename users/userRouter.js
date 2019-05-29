const express = require('express');

const Users = require('./userDb.js');
const router = express.Router();

router.use(express.json());
// router.use(validateUserId, validateUser, validatePost);

router.post('/', async (req, res) => {
    
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
    try {
        const accounts = await Users.get(req.query);
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const individualAcct = await Users.getById(req.params.id);
        res.status(200).json(individualAcct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User not found.'});
    }
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    if(!req.params.id) {
        res.status(400).json({ message: 'Invalid User ID' });
      } else {
          req.user = `${req.params.id}`;
      }
      next();
};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing user data.'});
    } else if (!req.body.name) {
        res.status(400).json({ message: 'Missing required name field.'});        
    }   
    next();
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing post data.' });
    } else if (!req.body.text) {
        res.status(400).json({ message: 'Missing required text field.' });
    }
    next();
};

module.exports = router;
