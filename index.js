
const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const postDB = require('./data/helpers/postDb.js');
const helmet = require('helmet');
const custom = require('./custom-middleware.js');

const server = express();
const parser = express.json();
const PORT = "4000";

server.use(parser);
server.use(helmet());
server.use(custom.capUser);
server.use(custom.manNameLength);

server.get('/api/users', (req, res) =>  {
    userDB.get()
        .then((users)   =>  {
            res
            .send(users)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The user list could not be retrieved." });
        });
})

server.get('/api/users/:id', (req, res) =>  {
    const { id }    =   req.params;
    userDB.get(id)
        .then((users)   =>  {
            res
            .json(users);
        })
        .catch(err  =>  {
            res
            .status(404)
            .json({ message: "The user with the specified ID could not be found."});
        })
})

server.post('/api/users',   (req, res)  =>  {
    if(res.locals.capName.length < 1 || res.locals.capName === undefined) {
        return res
        .status(400)
        .json({ errorMessage: "Please provide a name for the user." })
    }
    const obj = { name: res.locals.capName };
    userDB.insert(obj)
        .then((item)    =>  {
            res
            .status(201)
            .json(item);
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "There was an error adding your user." })
        })
})

server.put('/api/users/:id',    (req, res)  =>  {
    const { id } = req.params;
    const obj = { name: res.locals.capName };
    if(obj.name === "") {
        res
        .status(400)
        .json({ message: "Please provide a name for the user." })
    }
    userDB.update(id, obj)
        .then((count)    =>  {
            if(count === 0 )    {
                res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
            }   else {
                userDB.get(id)
                    .then(user  =>  {
                        res
                        .json(user)
                    })
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The user's name could not be changed" });
        })
})

server.delete("/api/users/:id", (req, res)  =>  {
    const { id } = req.params;
    userDB.remove(id)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
            }   else {
                res
                .json({ message: "Success!"})
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The user could not be removed" })
        })
})

server.listen(PORT, () =>  {
    console.log("server started. Kind of..");
})
