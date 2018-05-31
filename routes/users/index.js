const users = require('express').Router();
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');
const getPostsByUser = require('./getPostsByUser');
const getSingleUser = require('./getSingleUser');
const updateUser = require('./updateUser');

users.post('/', createUser);
users.get('/', getAllUsers);
users.get('/:userId', getSingleUser);
users.put('/:userId', updateUser);
users.delete('/:userId', deleteUser);

module.exports = users;