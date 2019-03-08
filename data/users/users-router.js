const express = require('express');

const db = require('./userDb');

const router = express.Router();

router.use(express.json());

uppercaseName = (name) => {
    name = name.toUpperCase();
    return name;
}

// //test get
// router.get('/', (req, res) => {
//     res.status(200).send('Hello from Users Router')
// })

//get all users
    router.get('/', async (req, res) => {
        try {
            const users = await db.get();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({
                message: 'could not load users'
            })
        }
    })
//get user by id

router.get('/:id', async (req, res) => {
    try {
        const users = await db.getById(req.params.id);
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({
            message: 'could not load users'
        })
    }
})

//get users posts
router.get('/posts/:id', async (req, res) => {
        try {
            const posts = await db.getUserPosts(req.params.id);
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json({
            message: 'could not load users'
        })
    }
});

//create new user
router.post('/', async (req, res) => {
    try {
        const upper = uppercaseName(req.body.name)
        const user = await db.insert(upper)
        if(req.body.name) {
            res.status(200).json(user);
        } else {
            res.status(500).json({
                message: 'Looks like you did not tell us your name, try again'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'cannot add user'
        })
    }
})

//update user

router.put('/:id', async (req, res) => {
    try {
        const user = await db.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'The user could not be found'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "could not update the user"
        })
    }
})

//delete user

router.delete('/:id', async (req, res) => {
    try {
        const user = await db.remove(req.params.id);
        console.log(user)
        res.status(200).json({
            message: 'succesfully deleted'
        })
    } catch (e) {
        res.status(500).json({
            message: 'unable to delete the user'
        })
    }
})

module.exports = router