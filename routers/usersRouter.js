const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb');

// custom middleware
function isEven(req, res, next) {
    let d = new Date();
    d = d.toLocaleTimeString().split(':')[2];
    // console.log(d);

    if (d % 2 === 0) {
        next();
    } else {
        res.status(403).json({error: errors["403"]});
    }
}

// READ
router.get('/', async (req, res, next) => {
    try {
        const users = await userDb.get();

        res.status(200).json(users);
    } catch(err) {
        next({code: 500});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            res.status(200).json(user);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

router.get('/:id/userPosts', async (req, res, next) => {
    try {
        const {id} = req.params;
        const userPosts = await userDb.getUserPosts(id);

        if(userPosts.length > 0) {
            res.status(200).json(userPosts);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

// CREATE
router.post('/', isEven, async (req, res, next) => {
    try {
        const user = {...req.body};

        if(!user.name) {
            next({code: 400});
        } else {
            const newUser = await userDb.insert(user);

            res.status(201).json(user);
        }
    } catch(err) {
        next({code: 500});
    }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = req.body;
        let findUser = await userDb.get(id);

        if(findUser && (user.name)) {
            const updateUser = await userDb.update(id, user);
            findUser = await userDb.get(id);

            res.status(200).json(findUser);
        } else if (!findUser) {
            next({code: 404});
        } else {
            next({code: 400});
        }
    } catch(err) {
        next({code: 500});
    }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userDb.get(id);

        if(user) {
            const delUser = await userDb.remove(id);

            res.status(200).json(user);
        } else {
            next({code: 404});
        }
    } catch(err) {
        next({code: 500});
    }
});

module.exports = router;
