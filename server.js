const bodyParser = require('body-parser');
const express = require('express')

const app = express();

app.use(bodyParser.json());

const STATUS_USER_ERROR = 422;
const STATUS_APPROVED = 200;

let users = [];
let userid = 0;

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => { 
    userid++;
    const name = req.body.name;
    const newUser = {
        id: userid,
        username: name
    }; 
    users.push(newUser);
    res.send(users);
});

app.get('/users:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let foundUser = null;
    users.forEach(user => {
        if (user.id == id) foundUser = user;
    });
        if (!foundUser) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: "No user by that id" });
        } else {
            res.send(foundUser);
        }
    });

app.delete('/users/:id', (req, res) => {
	const key = req.params.id;
	const newUsers = users.filter(user => {
		return key !== user.id.toString();
	});
	users = newUsers;
	res.send(users);
});

app.get('/search', (req,res) => {
	res.send(users.filter(item => {
		return item.name.toLowerCase() === req.query.name.toLowerCase();
	}));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on on http://localhost:${ port }`);
});
