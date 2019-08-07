// code away!
const server = require('./server.js');

const portNo = 8000;
server.listen(portNo, () => {
	console.log(`\n*** Server Running on http://localhost:${portNo} ***\n`);
});
