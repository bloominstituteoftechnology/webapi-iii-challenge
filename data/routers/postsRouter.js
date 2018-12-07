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

module.exports = router;
