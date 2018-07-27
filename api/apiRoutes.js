const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const tagRoutes = require('./tagRoutes')

module.exports = (server) => {
  server.use('/api/users', userRoutes)
  server.use('/api/posts', postRoutes)
  server.use('/api/tags', tagRoutes)
  server.use((err, req, res, next) => {
    switch (err.message) {
      case `CANT_FIND_USER`:
        res
          .status(404)
          .send({ error: `There is no existing user with that ID` })
        break
      case 'INVALID_ITEM':
        res
          .status(404)
          .send({ error: 'there is no existing item with that ID' })
        break
      case 'INVALID_TAG':
        res
          .status(400)
          .send({ error: 'Please provide text up to 80 characters max' })
        break
      case 'INVALID_USER':
        res
          .status(400)
          .send({ error: 'Please provide a name, up to 120 characters max' })
        break
      case 'INVALID_POST':
        res.status(400).send({ error: 'Please provide text for post' })
        break
      default:
        res.status(500).send({ error: err.message })
    }
  })
}
