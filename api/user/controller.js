const db = require('./userDb')

exports.getUsers = async ({ params: { id } }, res) => {
  if (id) {
    const response = await db.get(id)
    return response ? res.json(response) : res.status(404).json({ error: `No user found by id ${id}.` })
  }
  const response = await db.get()
  response ? res.json(response) : res.status(404).json({ error: 'No users found.' })
}

exports.getUserPosts = async ({ params: { id } }, res) => {
  if (!id || isNaN(id)) return res.status(400).json({ error: 'Please provide a valid id.' })
  const response = await db.getUserPosts(id)
  return response ? res.json(response) : res.status(404).json({ error: `No user found by id ${id}.` })
}

exports.postUser = async ({ body: { name } }, res) => {
  if (!name) return res.status(400).json({ error: 'Please provide a valid name.' })
  const response = await db.insert({ name })
  response ? res.redirect('/api/user') : res.status(400).json({ error: 'Unable to add user to the database.' })
}

exports.updateUser = async ({ body: { name }, params: { id } }, res) => {
  if (!id || isNaN(id)) return res.status(400).json({ error: 'Please provide a valid id.' })
  if (!name) return res.status(400).json({ error: 'Please provide a valid name.' })
  const response = await db.update(id, { name })
  response ? res.json(response) : res.status(404).json({ error: `No user found by id ${id}.` })
}

exports.delUser = async ({ params: { id } }, res) => {
  if (!id || isNaN(id)) return res.status(400).json({ error: 'Please provide a valid id.' })
  const response = await db.remove(id)
  response ? res.json(response) : res.status(404).json({ error: `No user found by id ${id}.` })
}