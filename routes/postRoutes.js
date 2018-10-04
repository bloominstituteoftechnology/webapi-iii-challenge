const express = require('express');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const tagDb = require('../data/helpers/tagDb.js');
const router = express.Router();

const upperCaseName = (req, res, next) =>{
    if(req.body.name){
        let capNext = true;
        let upperCasedName = '';
        for(let i=0; i<req.body.name.length; i++){
            if(capNext){
                upperCasedName = upperCasedName.concat(String(req.body.name[i]).toUpperCase());
                capNext = false;
            }else{
                if(req.body.name[i]===' '){
                    capNext = true;
                }
                upperCasedName = upperCasedName.concat(req.body.name[i]);
            }
        }
        console.log(`changing '${req.body.name}' to '${upperCasedName}'`);
        req.body.name = upperCasedName;
    }
    next();
};

router.get('/:dbtype', (req, res)=>{
    const {dbtype} = req.params;
    console.log(dbtype);
    switch (dbtype){
        case 'posts':
            postDb.get()
                .then(posts =>{
                    res.status(200).json(posts);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.get()
                .then(users =>{
                    res.status(200).json(users);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.get()
                .then(tags =>{
                    res.status(200).json(tags);
                })
                .catch(err => console.error(err));
            break;
        case 'user':
            res.status(400).send('need a user id argument');
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

router.get('/:dbtype/:id', (req, res)=>{
    const {dbtype, id} = req.params;
    // res.status(200).send(`dbtype:${dbtype}\nid:${id}`);
    switch (dbtype){
        case 'posts':
            postDb.get(id)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.get(id)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.get(id)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
                break;
        //retrieve the list of posts from a user by user ID
        case 'user':
            userDb.getUserPosts(id)
                .then(posts =>{
                    res.status(200).send(posts);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

router.post('/:dbtype', upperCaseName, (req, res)=>{
    const {dbtype} = req.params;
    const item = req.body;
    switch (dbtype){
        case 'posts':
            postDb.insert(item)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.insert(item)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.insert(item)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

router.delete('/:dbtype/:id', (req, res)=>{
    const {dbtype, id} = req.params;
    switch (dbtype){
        case 'posts':
            postDb.remove(id)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.remove(id)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.remove(id)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

router.put('/:dbtype/:id', upperCaseName, (req, res)=>{
    const {dbtype, id} = req.params;
    const item = req.body;
    switch (dbtype){
        case 'posts':
            postDb.update(id, item)
                .then(post =>{
                    res.status(200).json(post);
                })
                .catch(err => console.error(err));
            break;
        case 'users':
            userDb.update(id, item)
                .then(user =>{
                    res.status(200).json(user);
                })
                .catch(err => console.error(err));
            break;
        case 'tags':
            tagDb.update(id, item)
                .then(tag =>{
                    res.status(200).json(tag);
                })
                .catch(err => console.error(err));
            break;
        default:
            res.status(400).send(`URI ${dbtype} not found`);
    }
});

module.exports = router;