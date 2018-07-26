const express = require('express');
const router = express.Router();
const postDb = require('../../data/helpers/postDb');

router.get('/', (req, res, next) => {
    postDb.get()
        .then(postData => {
            res.status(200).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The posts could not be retrieved."
            })
        })
});

//GET POST TAGS
router.get('/:id/tags', (req, res) => {
  
    let id = req.params.id;
    postDb.getPostTags(id)
        .then(userPostData => {
            res.status(200).json(userPostData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The post tags could not be retrieved."
            })
        })
});

module.exports = router;