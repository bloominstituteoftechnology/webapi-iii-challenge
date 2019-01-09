// import modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// import helpers
const userDb = require('./data/helpers/userDb.js');

// init server
const server = express();

// apply middleware
server.use(bodyParser());
server.use(cors());
server.use(helmet());
server.use(morgan('short'));

// get users
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: 'Please provide an ID.'
        })
    }
    try {
        const user = await userDb.get(id);
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({
                message: 'Cannot find user.'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: 'Could not get user info.',
            error: err
        });
    }
})

module.exports = server; 