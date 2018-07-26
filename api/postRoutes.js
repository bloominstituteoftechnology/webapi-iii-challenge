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
router.get('/:id', async (req, res, next) => {
    try {
    const { id } = req.params;
    const post = await postDb.get(id);
    console.log(post);
    if(post === undefined) {
        next({
            code: codes.NOT_FOUND,
            message: "There is no post with that id"
        })
        return;
    }
    res.status(codes.OK).json(post);
    } catch (err) {
        next({
            code: codes.INTERNAL_SERVER_ERROR,
            message: "Was not able to get post with that id at this time"
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, text } = req.body;
        if(userId === undefined || text === undefined) {
            next({
                code: codes.BAD_REQUEST,
                message: "Either the text, userId or both are not filled out please put that information"
            })
            return;
        }
        const postResponse = postDb.insert(req.body);
        res.status(codes.OK).json(postResponse);
    }
    catch (err) {
        next({
            code: codes.INTERNAL_SERVER_ERROR,
            message: "Was not able to create the post"
        })
    }
})
router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const { userId, text } = req.body;

        if(userId === undefined || text === undefined) {
            next({
                code: codes.BAD_REQUEST,
                message: "Put the text and userId in order to update the post"
            })
            return;
        }
        const updateResponse = await postDb.update(id, req.body);
        if(updateResponse === 0) {
            next({
                code: codes.NOT_FOUND,
                message: "The post with that id could not be found to be updated."
            })
            return;
        }
        res.status(codes.OK).json(updateResponse);
    }
    catch(err) {
        next({
            code: codes.INTERNAL_SERVER_ERROR,
            message: "Could not update post"
        })
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const deleteResponse = await postDb.remove(id);
        if(deleteResponse === 0) {
            next({
                code: codes.NOT_FOUND,
                message: "The post with that id could not be found to be deleted"
            })
            return;
        }
        res.status(codes.OK).json(deleteResponse);
    }
    catch (err) {
        next({
            code: codes.INTERNAL_SERVER_ERROR,
            message: "Could not delete post"
        })
    }
});

module.exports = router;