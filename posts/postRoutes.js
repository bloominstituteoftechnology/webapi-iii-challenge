const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');

router.use(express.json());


// C - Create
// Ra - ReadAll
router.get('/', async (req, res) => {
    try {
        const posts = await db.get();

        posts.length > 0 ?
            res
                .status(200)
                .json(posts)
            :
            res
                .status(404)
                .json({
                    errorMessage: "No posts found at this time. Try again Later please."
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'An unknown error occured. Please try again'
            });
    }

    res
        .status(200)
        .send('Welcome to Posts');
});

// R1 - ReadOne
// U - Update
// D - Destroy

module.exports = router;