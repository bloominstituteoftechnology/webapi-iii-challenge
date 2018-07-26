const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')
const tagRoutes = require('./tagRoutes')

module.exports = (server) => {
  server.use('/api/users', userRoutes)
  server.use('/api/posts', postRoutes)
  server.use('/api/tags', tagRoutes)
}
