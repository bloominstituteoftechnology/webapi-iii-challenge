const server=require('./api/server.js');
const port = process.env.PORT || 8080;

server.listen(port,()=>console.log('************LISTENING ON PORT 8080************'))