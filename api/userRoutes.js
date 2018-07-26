const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;


const express = require('express');
const userDb = require('./../data/helpers/userDb');

const router = express.Router();



//middleware

router.get('/', async (req, res) => {
    try {
    const users = await userDb.get();
    res.status(OK_CODE).json(users);
    } catch (err) {
    }
})
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const user = await userDb.get(id);
    if(user === undefined) {
        res.status(NOT_FOUND_CODE).json({ error: 'The user with that id cannot be found'});
        res.end();
        return;
    }
    res.status(OK_CODE).json(user);
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
            throw BAD_REQUEST_CODE;
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
            throw BAD_REQUEST_CODE;
        }
        const updateResponse = await userDb.update(id, req.body);
        if(updateResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(OK_CODE).json(updateResponse);
    }
    catch(err) {
}
});
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await userDb.remove(id);
        if(deleteResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(200).json(deleteResponse);
    }
    catch (err) {
      
    }
});


module.exports = router;