const express = require('express');
const app = express();
const cors = require('cors');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const bodyParser = require('body-parser');
const port = 5555;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let errorHandler = (status, message, res) => {
    res.status(status).json({ error: message });
};

app.get('/', (req, res) => {
    res.send('Hello there.')
});


//*****Endpoints for users*****
app.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            return errorHandler(500, 'Error with database, try again.', res);
        });
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .get(id)
            .then(user => {
                if (user === 0) {
                    return errorHandler(404, 'User not found by this ID, please confirm ID number and try again.', res);
                }
                res.json(user);
            })
            .catch(error => {
                return errorHandler(500, 'Server malfunctioning, try turning it off and on.', res);
            });
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
        userDb
            .insert({ name })
            .then(response => {
                res.json(response);
            })
            .catch(error => {
                return errorHandler(500, 'Whoops, I done gone boofed it...', res);
            });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
        userDb
            .remove(id)
            .then(deleted => {
                if (deleted === 0) {
                    return errorHandler(404, 'Tarnation, there be none such thing here.', res);
                }
                res.json(deleted);
            })
            .catch(error => {
                return errorHandler(500, 'Buckeroo, you gone burned our chicken dinner!', res );
            });
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
        userDb
            .update(id, { name })
            .then(response => {
                if (response === 0) {
                    return errorHandler(404, 'Whoopsie daisy, I cannot be making this update...', res);
                } else {
                    db.find(id)
                    .then(user => {
                    res.json(response);    
                    });
                }
            })
            .catch(error => {
                return errorHandler(500, 'Er mah gersh!', res);
            });
});

//*****Post Endpoints*****/

app.get('/api/posts', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            return errorHandler(500, 'Messeded up the thingie', res);
        });
});

app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb
        .get(id)
        .then(posts => {
            if (posts === 0) {
                return errorHandler(404, 'It grinds my gears that I cannot find what you are looking for.', res);
            }
            res.json(posts);
        })
        .catch(error => {
            return errorHandler(500, 'Booped the snoot', res);
        });
});

app.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    postDb
        .insert({ userId, text })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            return errorHandler(500, 'Borked the database', res);
        });
});

//*****Tag Endpoints *****

app.get('/api/tags', (req, res) => {
    tagDb
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(error => {
            return errorHandler(500, 'Doh!', res);
        });
});

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});