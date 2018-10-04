const express = require('express'); 
const helmet = require('helmet'); 
const db = require('../data/helpers/userDb')

const server = express();

server.use(helmet());
server.use(express.json());


const yell = (req,res,next) => {
req.body.name = req.body.name.toUpperCase();
next();
};

    router.get('/',(req,res)=>{
        db.get()
            .then(users =>{
            res.status(200).json(users);
            })
            .catch(error => res.status(500).json({error:'Internal Server Error.'}))
        });
    
    router.get('/:id', (req,res)=> {
        db.getUserPosts(req.params.id)
            .then(user => {
            res.status(200).json(users);
        })
            .catch(error => res.status(500).json({error:'Internal Server Error.'}));
        });
        
    router.post('/', yell, (req,res)=> {
        const {name} = req.body;
        const newUser = {name};
        if(!name) {
            return res.status(400).json({error:"Bad Request, No name sent."});
        }
        db.insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => res.status(500).json({error:'Internal Server Error.'}));
        });
    
    router.delete('/:id',(req,res) => {
        const {id} = req.params;
        db.remove(id)
        .then(deleteUser => {
            if(deleteUser) {
                res.status(200).json({message:'Ok.'});
            } else {
                res.status(404).json({error:`Id: ${id} Not Found.`});
            }
        })
        .catch(error => {
            res.status(500).json({error:'Internal Server Error.'});
        });
        });
 
    router.put("/:id", yell, (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const updatedUser = { name };
        db.update(id, updatedUser)
          .then(user => {
            if (user) {
              res.status(200).json(user);
            } else {
              res
                .status(404)
                .json({ error: `Id: ${id} Not Found.` });
            }
            })
            .catch(error => {
            res.status(500).json({ error: "Internal Server Error." });
            });
            });

      module.exports = router;