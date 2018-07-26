const app = require('express')();
require('./middleware')(app);
require('./routes')(app);

app.listen(8000, () => {
  console.log('=== SERVER LISTENING ===');
});
