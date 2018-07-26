const express = require('express');

const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

router.get('/', async (req, res) => {  // GET tag
    try {
        const users = await tagDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The tags information could not be retrieved.' })
    };
});

router.get('/:id', async (req,res) => {
    const {id} = req.params.id;
    try {
        const users = await tagDb.get(id);   
        if (!users) 
            res.status(404).send({ message: 'The tag with the specified ID does not exist.' })
            res.status(200).json(response);
    } catch (error) {
        res.status(500).send({error: 'Tags information could not be retrieved.'})
    }
})

router.post('/', async (req, res) => {
    if (!req.body.tag) 
        res.status(400).send({message: 'Please provide a tag!' })
    try {
        const response = await tagDb.insert(req.body);
        const newTag = await tagDb.get(response.id);
        res.status(200).json(newTag);
    } catch(error) {
        res.status(500).send({message: 'Tag was unable to added.', error: error.message});
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const tag = await tagDb.get(id);
        if (!tag) 
            res.status(404).send({ message: 'The tag does not exist.' })
            await userDb.remove(id);
            res.status(200).json(tag);
    } catch(error) {
        res.status(500).send({message: 'Unable to remove tag.', error: error.message})
    }
})

module.exports = router;