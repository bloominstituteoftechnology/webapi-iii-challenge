const express = require('express');
const postdb = require('../data/helpers/postDb');

const router = express.Router();

//middleware
router.use(express.json());

//endpoints for postdb CRUD methods
// GET /api/posts/
router.get('/', (req, res) => {
    postdb.get()
    .then(posts =>{res.status(200)
    .json(posts)
    })
    .catch(error=>{res.status(500)
    .json({error: "The posts could not be retrieved."})
    })
});

module.exports = router;