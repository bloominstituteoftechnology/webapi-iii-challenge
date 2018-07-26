const codes = require("./../status-codes/statusCodes");

const express = require("express");
const postDb = require("./../data/helpers/postDb");

const router = express.Router();


router.get('/', async (req, res) => {
    try {
    const posts = await postDb.get();
    res.status(codes.OK).json(posts);
    } catch (err) {
    }
})
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const post = await postDb.get(id);
    if(post === undefined) {
        
    }
    res.status(codes.OK).json(post);
    } catch (err) {
    }
})

router.post('/', async (req, res) => {
    try {
        const { userId, text } = req.body;
        if(userId === undefined || text === undefined) {
        }
        const postResponse = postDb.insert(req.body);
        res.status(codes.OK).json(postResponse);
    }
    catch (err) {
        
    }
})
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { userId, text } = req.body;

        if(userId === undefined || text === undefined) {
        }
        const updateResponse = await postDb.update(id, req.body);
        if(updateResponse === 0) {
        }
        res.status(codes.OK).json(updateResponse);
    }
    catch(err) {
        
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await postDb.remove(id);
        if(deleteResponse === 0) {
        }
        res.status(codes.OK).json(deleteResponse);
    }
    catch (err) {
        
    }
});

module.exports = router;