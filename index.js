const server = require("./server.js");

const port = 6969;
const greeting = "\\=================It's YER BOI API===============\\"; 
server.listen(port, () => {
  console.log(
    `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
  );
});