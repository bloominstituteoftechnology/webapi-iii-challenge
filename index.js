const server = require('express')()
require('./api/middleware')(server)
require('./api/apiRoutes')(server)

server.listen(8000, () => {
  console.log('\n=== API RUNNING... ===\n')
})
