const server = require ('./api/server.js')

const port = (14+15+4+5+2+12+15+7)*100
server.listen(port, () => console.log(`\nAPI running on n+o+d+e+b+l+o+g port ${port}\n`));