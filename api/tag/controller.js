const db = require('./tagDb')

exports.postTag = async (req, res) => {
  const response = await db.insert()
  res.json(response)
}
