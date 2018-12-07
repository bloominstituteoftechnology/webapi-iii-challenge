const express = require('express');

const router = express.Router();
const userDb = require('../data/helpers/userDb');



router.get('/', (req, res) => {
    userDb.get()
        .then((users) => {
            if (users.length > 0) {
                res.json(users)
            } else {
                res
                .status(404)
                .json({
                    message: "There are currently no Hobbits in the Shire. Check back later or go create a new one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the Hobbits. They're hiding."
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not exist."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find this hobbit"
            })
        })
});

router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id)
                    .then(posts => {
                        if (posts.length > 0) {
                            res.json(posts);
                        } else {
                            res
                            .status(404)
                            .json({
                                message: "This Hobbit has said nothing worth writing down."
                            })
                        }
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "This Hobbit does not exist so we cannot quote it."
                })
            }
        })
        .catch(err=>{
            res
            .status(500)
            .json({
                message: "Failed to find this Hobbit or its quotes."
            })
        })
});



module.exports = router;