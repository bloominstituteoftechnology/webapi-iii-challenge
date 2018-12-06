const express = require('express')
const users = require("../data/helpers/userDb");
const router = express.Router()

// custom middleware
const upperCassed = (req, res, next) => {
    //modify req.body.name to upper case
    const newName = req.body.name.toUpperCase();
    //set, new name upperCassed, on req.name
    req.body.name = newName;
    //move into next middleware
    next();
};

// USER ROUTES

router.get("/", (req, res) => {
    users
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The users could not be retrieved" });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    users
        .get(id)
        .then(user => {
            user ?
                res.json(user)
                :
                res.status(400).json({
                    message: "The user with the id does not exist"
                });

        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved"
            });
        });
});



router.post("/", upperCassed, (req, res) => {

    req.body.name ?
        users
            .insert(req.body)
            .then(() => {
                users.get().then(user => {
                    res.status(201).json(user);
                });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        error: "There was an error while saving the post to the database"
                    });
            })
        :
        res
            .status(400)
            .json({ errorMessage: "Please provide username for the user" });

});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(count => {
            count
                ? users.get().then(users => {
                    res.status(200).json(users);
                })
                : res.status(404).json({ error: "Invalid id" });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to delete user" });
        });
});

router.put("/:id", upperCassed, (req, res) => {

    const { id } = req.params;

    req.body.name ?
        users
            .update(id, req.body)
            .then(count => {
                count
                    ? users.get(id).then(user => {
                        res.json(user);
                    })
                    : res
                        .status(404)
                        .json({ error: "The user with specified ID does not exist." });
            })
            .catch(err => {
                res.status(500).json({ error: "The username could not be update" });
            })
        :
        res
            .status(400)
            .json({ errorMessage: "Please provide username for the user" });

});





module.exports = router