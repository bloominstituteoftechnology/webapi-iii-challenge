const express = require('express');
const router = express.Router();

// TODO: Stretch: Abstract out error handling
const usersDbAccessError = {"error": "There was an error accessing the users database table."};
const postsDbAccessError = {"error": "There was an error accessing the posts database table."};

// ~~ GET ~~ //
// postDB: get() -> [{obj1},...,{objN}]
router.get('/', (req, res) => {
    postsDb.get()
        .then((postsList) => {
            res.status(200).json(postsList);
        })
        .catch((err) => {
            console.error('postDb.js/get() Access Error:\n', err);
            res.status(500).json(postsDbAccessError);
        });
});

// postDB: get(id) -> {obj}
router.get('/:id', (req, res) => {
    postsDb.get(req.params.id)
        .then((post) => {
            if(post !== undefined) {
                res.status(200).json(post);
            } else {
                res.status(404).json({"error": `A post with ID ${req.params.id} doesn't exist.`});
            }
        })
        .catch((err) => {
            console.error('postDb.js/get(id) Access Error:\n', err);
            res.status(500).json(postsDbAccessError);
        });
});

// ~~ POST ~~ /
// postDB: insert({obj}) -> {id: ##}
router.post('/', (req, res) => {
    if(req.body.userId && req.body.text) {
        usersDb.get(req.body.userId)
            .then((user) => {
                if(user !== undefined) {
                    const newPostObj = {"userId": req.body.userId, "text": req.body.text};
                    postsDb.insert(newPostObj)
                        .then((newId) => {
                            postsDb.get(newId.id)
                                .then((newPost) => {
                                    res.status(201).json(newPost);
                                })
                                .catch((err) => {
                                    console.error('postDb.js/get(id) Access Error:\n', err);
                                    res.status(500).json(postsDbAccessError);
                                });
                        })
                        .catch((err) => {
                            console.error(`postDb.js/insert({"userId": "value", "text": "value"}) Access Error:\n`, err);
                            res.status(500).json(postsDbAccessError);
                        });
                } else {
                    res.status(404).json({"error": `A user with ID ${req.body.userId} doesn't exist.`});
                }
            })
            .catch((err) => {
                console.error(`userDb.js/insert({"name": "value"}) Access Error:\n`, err);
                res.status(500).json(usersDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide userId and text values in your POST."});
    }
});

// ~~ PUT ~~ //
// postDB: update(id, {obj}) -> count of updated records
// TODO: Put in a check somewhere in here that ensures the userId supplied is a legitimate user
router.put('/:id', (req, res) => {
    if(req.body.userId && req.body.text) {
        postsDb.get(req.params.id)
            .then((post) => {
                if(post !== undefined) {
                    const editedPost = {"userId": req.body.userId, "text": req.body.text};
                    postsDb.update(req.params.id, editedPost)
                        .then((updateCount) => {
                            if(updateCount > 0) {
                                postsDb.get(req.params.id)
                                    .then((post) => {
                                        res.status(200).json(post);
                                    })
                                    .catch((err) => {
                                        console.error('postDb.js/get(id) Access Error:\n', err);
                                        res.status(500).json(postsDbAccessError);
                                    });
                            } else {
                                res.status(500).json({"error": "We received what appears to be valid data from you, but the DB didn't update the record for unknown reasons."});
                            }
                        })
                        .catch((err) => {
                            console.error('postDb.js/update(id, {"userId": ##, "text": "value"}) Access Error:\n', err);
                            res.status(500).json(postsDbAccessError);
                        });
                } else {
                    res.status(404).json({"error": `A post with ID ${req.params.id} doesn't exist.`});
                }
            })
            .catch((err) => {
                console.error('postDb.js/get(id) Access Error:\n', err);
                res.status(500).json(postsDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide userId and text values in your PUT"});
    }
});

// ~~ DELETE ~~ //
// post: remove(id) -> # of records deleted
router.delete('/:id', (req, res) => {
    // TODO: Delete post
    // const postToDelete;
    // postsDb.get(req.params.id).then((post) => if(post !== undefined) postToDelete = post).catch((err) => error stuff);
    // Delete post as normal
});

module.exports = router;
