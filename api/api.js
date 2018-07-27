const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes/userRoutes');
const postRoutes = require('./postRoutes/postRoutes');
const tagRoutes = require('./tagRoutes/tagRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);
router.use('/docs', (req, res, next)=> {
    res.redirect(301, 'https://documenter.getpostman.com/view/4722371/RWMLJkVy')
    .catch(err => {
        res.status(500).send('failed to load documentation. Sorry!')
    })
})


module.exports = router;