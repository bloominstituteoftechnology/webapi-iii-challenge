'use strict'

const _postDB = require('../data/helpers/postDb')

exports.getPosts = async (req, res) => {
    try{
        const posts = await _postDB.get()
        res.status(200)
            .json({
                posts
            })
    }catch(err){
        res.status(500)
            .json({
                error: "Posts can not be retrived",
                errorLog: err
            })
    }
}

exports.insertPost = async (req, res) => {
    try{
        const newPost = await _postDB.insert(req.body)
        res.status(200)
            .json({
                newPost
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a problem in inserting new post",
                errorLog: err
            })
    }
}

exports.deletePost = async (req, res) => {
    try{
        const deletePost = await _postDB.deletePost(req.params.id)
        res.status(200)
            .json({
                status: true,
                deletePost
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a problem in deleting the post",
                errorLog: err
            })
    }
}

exports.updatePost = async (req, res) => {
    try{
        const updatedPost = await _postDB.update(req.params.id, req.body)
        res.status(200)
            .json({
                updatedPost
            })
    }catch(err){
        res.status(500)
            .json({
                error:"There was some problem in deleting the post",
                errorLog: err
            })
    }
}