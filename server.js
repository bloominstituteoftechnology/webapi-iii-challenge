const express = require('express');
const bodyParser = require('body-parser');
// const CORS = require('cors');
const API = require('./api.js');

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(CORS());

const api = new API({ url:'http://localhost:5000/api'})
const entities = ['users','posts','tags']
const requiredFields = {
    'users': ['name'],
    'posts': ['userId', 'text'],
    'tags': ['tag']
}
api.createEntities(entities)
// Users api

entities.forEach(each => {
    // Get all objects of a speicifc entity
    app.get(`/api/${each}`, (_, res) => {
        api.endpoints[each].getAll()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ errorMessage: `The ${name} information could not be retrieved.` }))
    })

    // Get one object by its id of a specific entity
    app.get(`/api/${each}/:id`, (req, res) => {
        const { id } = req.params
        api.endpoints[each].getOne({id})
        .then(response => {
            if (response.length > 0) {
                res.status(200).send(response)
            } else{
                res.status(404).json({ errorMessage: `The ${name} with the specified ID does not exist.` })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: `The ${name} information could not be retrieved.` })
        })
    })

    // Insert one object to a specific entity
    app.post(`/api/${each}`, (req, res) => {
        const data = req.body
        for (let i=0; i < requiredFields[each].length; i++) {
            const field = requiredFields[each][i]
            if (!req.body[field]) {
                res.status(400).json({ errorMessage: `Please provide ${field} for the ${each}.` });
                return;
            }
        }

        // for posts entity
        if (data.userId) {
            // check if userId is existed
            api.endpoints[each].getOne({ id: data.userId })
            .then(response => {
                if (response.length > 0) {
                    // insert
                    api.endpoints[each].insert({ data, res })
                    .then(response => {
                        res.status(200).json({ id: response[0], ...data})
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
                    })
                } else{
                    res.status(404).json({ errorMessage: `The user with the specified ID does not exist.` })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
            })
            return;
        }
        
        // for other entities
        api.endpoints[each].insert({ data })
        .then(response => {
            res.status(200).json({ id: response[0], ...data})
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `The ${name} information could not be retrieved.` })
        })
    })

    // Delete one object of a specific entity
    app.delete(`/api/${each}/:id`, (req, res) => {
        const { id } = req.params
        api.endpoints[each].remove({id})
        .then(response => {
            if (response === 1) {
                res.status(200).send(`The ${each} have been deleted`)
            } else{
                res.status(404).json({ errorMessage: `The ${each} with the specified ID does not exist.` })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
        })
    })

    // Update one object of a specific entity
    app.put(`/api/${each}/:id`, (req, res) => {
        const data = req.body
        const { id } = req.params

        // check if updated object contains all required fields
        for (let i=0; i < requiredFields[each].length; i++) {
            const field = requiredFields[each][i]
            if (!req.body[field]) {
                res.status(400).json({ errorMessage: `Please provide ${field} for the ${each}.` });
                return;
            }
        }

        // for posts entity
        if (data.userId) {
            // extra feat: post's creator only allow update own post.
            // to-do: check if updated userId is the same current userId 


            // check if userId is existed
            api.endpoints[each].getOne({ id: data.userId })
            .then(response => {
                if (response.length > 0) {
                    // update
                    api.endpoints[each].update({ id, data})
                    .then(response => {
                        if (response === 1) {
                            res.status(200).send(`The ${each} have been updated`)
                        } else {
                            res.status(404).json({ errorMessage: `The ${each} with the specified ID does not exist.` })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
                    })
                } else{
                    res.status(404).json({ errorMessage: `The user with the specified ID does not exist.` })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
            })
            return;
        }
        
        // for other entities
        api.endpoints[each].update({ id, data })
        .then(response => {
            if (response === 1) {
                res.status(200).send(`The ${each} have been updated`)
            } else {
                res.status(404).json({ errorMessage: `The ${each} with the specified ID does not exist.` })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `The ${each} information could not be retrieved.` })
        })
    })

})


app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})