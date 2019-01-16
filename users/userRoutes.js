const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb');

router.use(express.json());


// C - Create
router.post('/', (req, res) => {
    res
        .status(200)
        .json({
            url: '/users',
            operation: 'POST'
        });
});

// Ra - ReadAll
router.get('/', async (req, res) => {
    res
        .status(200)
        .json({
            url: '/users',
            operation: 'GET'
        });
});

// R1 - ReadOne
router.get('/:userId', (req, res) => {
    const id = req.params.userId;

    res
        .status(200)
        .json({
            url: `/users/${id}`,
            operation: `GET to User with id ${id}`
        });
});

// U - Update
router.put('/:userId', (req, res) => {
    const id = req.params.userId;

    res
        .status(200)
        .json({
            url: `/users/${id}`,
            operation: `PUT to user with id ${id}`
        });
});

// D - Destroy
router.delete('/:userId', (req, res) => {
    const id = req.params.userd;

    res
        .status(200)
        .json({
            url: `/users/${id}`,
            operation: `DELETE to User with id ${id}`
        });
});

module.exports = router;