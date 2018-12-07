const express = require('express');
const router = express.Router();
const postDB = require('../helpers/postDb.js');

router.get('', (req, res) =>  {
    postDB.get()
        .then((posts)   =>  {
            res
            .send(posts)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The post list could not be retrieved." });
        });
})

router.get('/:id', (req, res) =>  {
    const { id }    =   req.params;
    postDB.get(id)
        .then((posts)   =>  {
            res
            .json(posts);
        })
        .catch(err  =>  {
            res
            .status(404)
            .json({ message: "The posts with the specified ID could not be found."});
        })
})

router.post('',   (req, res)  =>  {
    const { text, userId }  =   req.body;
    const obj = { userId, text }
    postDB.get()
        .then(posts =>  {
            let userIds = posts.map((post)    =>  {
                return post.userId
            })
            if(text.length < 1 || text === undefined || userIds.includes(userId) === false) {
                return res
                .status(400)
                .json({ errorMessage: "Please provide a user ID and text for the post." })
            }   else {
                postDB.insert(obj)
                    .then((post)    =>  {
                        res
                        .status(201)
                        .json(post);
                    })
                    .catch(err  =>  {
                        res
                        .status(500)
                        .json({ message: "There was an error adding your post." });
                    })
            }
        })
})

router.put('',  (req, res)  =>  {
    const { text, id }  =   req.body;
    const obj = { text }
    postDB.update(id, obj)
        .then((count)    =>  {
            if(count === 0 )    {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
            }   else {
                postDB.get(id)
                    .then(user  =>  {
                        res
                        .json(user)
                    })
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The post could not be updated" });
        })
})

router.delete("/:id", (req, res)  =>  {
    const { id } = req.params;
    postDB.remove(id)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
            }   else {
                res
                .json({ message: "Success!"})
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The post could not be removed" })
        })
})

module.exports = router;
