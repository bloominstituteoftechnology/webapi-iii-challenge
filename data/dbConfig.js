const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    findUser,
    findUserById,
    insertUser,
    updateUser,
    removeUser,

    findPost,
    findPostById,
    insertPost,
    updatePost,
    removePost
  };
  
  function findUser() {
    return db('users');
  }
  
  function findUserById(id) {
    return db('users').where({ id: Number(id) });
  }
  
  function insertUser(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
  
  function updateUser(id, user) {
    return db('users')
      .where('id', Number(id))
      .update(user);
  }
  
  function removeUser(id) {
    return db('users')
      .where('id', Number(id))
      .del();
  }
  
  // POSTS functions
  function findPost() {
    return db('posts');
  }
  
  function findPostById(id) {
    return db('posts').where({ id: Number(id) });
  }
  
  function insertPost(post) {
    return db('posts')
      .insert(post)
      .then(ids => ({ id: ids[0] }));
  }
  
  function updatePost(id, post) {
    return db('posts')
      .where('id', Number(id))
      .update(post);
  }
  
  function removePost(id) {
    return db('posts')
      .where('id', Number(id))
      .del();
  }
  