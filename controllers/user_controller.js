'use strict'

const _usersDB = require('../data/helpers/userDb')

exports.getUsers = async (req, res) => {
    try{
        const users = await _usersDB.get()
        res.status(200)
            .json({
                users
            })
    }catch(err){
        res.status(500)
            .json({
                error: "Users information can not be retirved",
                errorLog: err
            })
    }
}

exports.insertUser = async (req, res) => {
    try{
        const newUser = await _usersDB.insert(req.body)
        res.status(200)
            .json({
                newUser
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a problem in inserting new user",
                errorLog: err
            })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const updatedUser = await _usersDB.update(req.params.id, req.body)
        res.status(200)
            .json({
                updatedUser
            })
    }catch(err){
        res.status(500)
            .json({
                error:"There was a problem in updating the user",
                errorLog: err
            })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const removeUser = await _usersDB.remove(req.params.id)
        res.status(200)
            .json({
                status: true,
                removeUser
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a problem in removing user",
                errorLog: err
            })
    }
}

exports.getUserPosts = async (req, res) => {
    try{
        const userPosts = await _usersDB.getUserPosts(req.params.id)
        res.status(200)
            .json({
                userPosts
            })
    }catch(err){
        res.status(500)
            .json({
                error: "There was a retriving user posts",
                errorLog: err
            })
    }
}
