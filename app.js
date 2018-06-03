const express = require('express');
const cors = require('cors');

const app = express();
const api = require('./routes');
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cors());
app.use('/api/users', api.usersRoutes);
app.use('/api/posts', api.postsRoutes);
app.use('/api/tags', api.tagsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Server listening on port: ${ port }`));