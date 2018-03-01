const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');

const app = express();

const STATUS_APPROVED = 200;
const STATUS_USER_ERROR = 422;

app.use(express);
app.use(bodyParser.json());

let users = {};
let userid = 0;

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => {
    userid++;
    const name = req.body.name;
    const newUser = {
        id: userid,
        username: users
    }
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.json({ err: `Must provide a username` });
    } else {
    users.push(newUser);
    res.send(users);
    }
});

// app.get()


const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`App is listening on on http://localhost:${ port }`);
});


