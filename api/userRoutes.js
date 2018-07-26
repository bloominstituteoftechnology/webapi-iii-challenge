const codes = require('./../status-codes/statusCodes');

const express = require('express');
const userDb = require('./../data/helpers/userDb');

const router = express.Router();



//middleware

router.get('/', async (req, res) => {
    try {
    const users = await userDb.get();
    res.status(codes.OK).json(users);
    } catch (err) {
    }
})
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const user = await userDb.get(id);
    if(user === undefined) {
        res.status(codes.NOT_FOUND).json({ error: 'The user with that id cannot be found'});
        res.end();
        return;
    }
    res.status(codes.OK).json(user);
    } catch (err) {

     }
})

router.post('/', async (req, res) => {
    const NAME_LENGTH_ERROR = 'NAME_LENGTH_ERROR';
    try {
        const { name } = req.body;
        if(name.length > 128) {
            throw NAME_LENGTH_ERROR;
        }
        if(name === undefined) {
            throw codes.BAD_REQUEST;
        }
        const postResponse = await userDb.insert(req.body);
        console.log(postResponse);
        res.status(CREATED_CODE).json(postResponse);
    } 
    catch (err) {
     console.log(err);
    }
});
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        if(name === undefined) {
            throw codes.BAD_REQUEST;
        }
        const updateResponse = await userDb.update(id, req.body);
        if(updateResponse === 0) {
            throw codes.NOT_FOUND;
        }
        res.status(codes.OK).json(updateResponse);
    }
    catch(err) {
}
});
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await userDb.remove(id);
        if(deleteResponse === 0) {
            throw codes.NOT_FOUND;
        }
        res.status(200).json(deleteResponse);
    }
    catch (err) {
      
    }
});


module.exports = router;