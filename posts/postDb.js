const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};

function get() {
  return db('posts');
}

function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function add(post) {
  console.log(post, "in the add")
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
