const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json());

//adding middleware
function atGate(req, res, next) {
    console.log(`At the gate, about to be eaten`);
  
    next();
}

server.use(atGate);

function auth(req, res, next) {
    // changing auth depending on the URL or if it applies globally:

    // if (req.url === '/mellon') {
    // if(Math.floor(Date.now()/1000) % 2 === 0) {
    if(Math.floor(Date.now()/1000) % 2 === 0 && req.url === '/mellon') {
      res.status(403).json({ error: 'Balance is the key, making things even is the secret to success' });  
      return;
    } else {
      next();
    }
}

server.get('/mellon', auth, (req, res) => {
    console.log('Gate opening...');
    console.log('Inside and safe');
    res.send('Welcome Traveler!');
});

server.use(cors());
server.use(helmet());
server.use(morgan('short'));

function logger (req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
          'Origin'
        )}`
    );

    next();
}

server.use(logger);

function upperCaseTag(req, res, next) {
    if (req.method === "GET" && req.url === "/tags") {
      let tags = res.json;
      res.json = function(data) {
        data.forEach(response => (response.tag = response.tag.toUpperCase()));
        tags.apply(res, arguments);
      };
    }
    next();
}

server.use(upperCaseTag);

// GET | Returns the stored users / posts / tags

server.get('/', (req, res) => {
    res.send({ hello: 'world', project: "blog" });
});

server.get('/users/', auth, (req, res) => {
    userDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/posts/', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/tags/', (req, res) => {
    tagDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

// GET | Returns the user / post / tag with the specified id

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    // console.log(id);
    userDb.get(id)
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.status(200).json(response)
        //adjusting for 0th index — the same happens in the next gets
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.get(id)
    .then(response => {
        res.status(200).json({id, response})
    })
    .catch( err => {
        console.log(err);
        res.status(404).json({ error: "Post not found." });
        // res.status(500).json({err, error: `Couldn't get post.`})
    })
})

server.get('/tags/:id', (req, res) => {
    const id = req.params.id;

    tagDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "Tag not found." });
            return;
        }
        res.status(200).json(response[id-1])
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get tag.`})
    })
})

// organize next gets in this similar order: user / post / tag

// GET | Unique User's Posts

server.get('/users/:id/posts', (req, res) => {
    const id = req.params.id;

    userDb.getUserPosts(id)
    .then(response => {
        if(response[id-1] === undefined) {
            res.status(404).json({ error: "User ID not found." });
            return;
        } else if (response.length === 0) {
            res.status(404).json({ error: "User posts not found." });
        }
        res.status(200).json(response[id-1])
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

// GET | Unique Post's Tags

server.get('/posts/:id/tags', (req, res) => {
    const id = req.params.id;

    postDb.getPostTags(id)
    .then(response => {
        if(response[id-1] === undefined) {
            res.status(404).json({ error: "Post ID not found." });
            return;
        } 
        // else if (response.length === 0) {
        //     res.status(404).json({ error: "Post tags not found." });
        // }
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

// POST | New User

server.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || name === '') {
        console.log("Error Code: ", 400, "Bad Response 1");
        res.status(400).json({ errorMessage: "Please provide a name for the user." });
        return;
    }
    userDb
    .insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json({response, name, message: "Successfully created new user."});
    })
    .catch(err => {
        res.status(500).json({err, message: "Couldn't create new user (might be due to duplicate name constraint)."});
    })
})

// POST | New Post

server.post('/posts', (req, res) => {
    const { text, userId } = req.body;

    if (!text || text === '') {
        console.log("Error Code: ", 400, "Bad Response 2");
        res.status(400).json({ errorMessage: "Please write content for the post." });
        return;
    } else if (!userId) {
        console.log("Error Code: ", 400, "Bad Response 3");
        res.status(400).json({ errorMessage: "No userId was provided for the post." })
        return;
    }
    postDb
    .insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json({response, text, userId, message: "Successfully created new post."});
    })
    .catch(err => {
        res.status(500).json({err, message: "Couldn't create new user (might be due to duplicate name constraint)."});
    })
})

// DELETE | Delete User

server.delete('/users/:id', (req,res) => {
    const id = req.params.id;

    if( !id ) {
        return res.status(404).json({ message: "Couldn't delete user. The user with this specified ID does not exist."})
    }

    userDb
    .remove(id)
    .then(response => {
        res.status(200).json({response, message: `User #${id} has been deleted.`});
    })
    .catch(err => {
        res.status(500).json({id, errorMessage: "The user could not be deleted."});
    })   
})

// DELETE | Delete Post

server.delete('/posts/:id', (req,res) => {
    const id = req.params.id;

    console.log(id);
    if( !id ) {
        return res.status(404).json({ message: "Couldn't delete post. The post with this specified ID does not exist."})
    }

    postDb
    .remove(id)
    .then(response => {
        res.status(200).json({response, message: `Post #${id} has been deleted.`});
    })
    .catch(err => {
        res.status(500).json({id, errorMessage: "The post could not be deleted."});
    })   
})

// PUT | Update User

server.put('/users/:id', (req,res) => {
    const id = req.params.id;
    const user = req.body

    userDb
    .update(id, user)
    .then(response => {
        res.status(200).json({ id, user, message: `User #${id} has been updated.` });
    })
    .catch(err => {
        res.status(500).json({errorMessage: "The user could not be updated."});
    })   
})



server.listen(8100, () => console.log('Blog API running on port 8100 . . .'));