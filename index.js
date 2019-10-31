require('dotenv').config();

const server = require('./server.js');

//port coming from environment, it'll be set by Heroku
const port = process.env.PORT || 6000;

console.log('Current Port: ', port);
console.log('\n Process Message: ', process.env.MSG);


server.listen(port, () => {
  console.log(`\n* Your host:${port} is a bit eccentric. *\n`);
});

server.get('/', (req, res)=> {
  res.status(200).json({message: process.env.MSG})
})

