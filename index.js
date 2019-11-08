// code away!
const server = require (`./server`);

server.list(4000, () => {
    console.log(`\n*** Server Running on http://localhost:4000 *** \n`);
});