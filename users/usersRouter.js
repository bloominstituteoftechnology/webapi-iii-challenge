const express = require('express');
const users = require('../data/helpers/userDb');

const router = express.Router();

const upperCase = (req, res, next) => {
    console.log(req.params)
    req.body.name = req.body.name.toUpperCase();
    next();
};

const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
}

// get users
router.get('/', (req, res) => {
    users
        .get()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            return sendErrorMsg(500, 'Users information could not be retrieded', res)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(user => {
            if (user[0]) {
                sendErrorMsg(404, 'The post with the specified ID does not exist.', res);
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            return sendErrorMsg(500, 'No User by that Id', res);
        });
});

router.get('/posts/:userId', (req, res) => {
    const { userId } = req.params;
    users
        .getUserPosts(userId)
        .then(userPost => {
            userPost === 0 ?
                sendErrorMsg(404, 'There are no posts by that users', res) :
                res.status(200).json(userPost)
        })
        .catch(err => {
            return sendErrorMsg(500, 'There was an error searching for posts');
        });
});


// new user

router.post('/', upperCase, (req, res) => {
    const { name } = req.body;
    users
        .insert({ name })
        .then(response => {
            res.status(200).json({ name: `${req.body.name}` })
        })
        .catch(err => {
            return sendErrorMsg(500, 'Name is not added to DB', res)
        });
});

//update user

router.put('/:id', upperCase, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    users
        .update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} name was updated` })
            } else {
                return sendErrorMsg(400, 'id not found')
            }
        })
        .catch(err => {
            return sendErrorMsg(500, 'The name could not be modified');
        });
});

//delete user

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(count => {
            res.status(200).json({ message: `${count} name has been removed` })
        })
        .catch(err => {
            return sendErrorMsg(500, 'The user could not be removed', res);
        });
});


module.exports = router;