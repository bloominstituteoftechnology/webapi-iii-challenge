const express = require('express');
const db = require('../data/helpers/userDb');
const router = express();

const checkName = (req, res, next) => {
    const name = req.body.name;
    if(!name) {
        res.status(404).json({ message: 'add a name' })
        next();
    } else {
        next();
    }
}

// CREATE IN CRUD 
router.post('/', checkName, async (req, res) => {
    const user = req.body;
    try {
        const newUser = await db.insert(user)
        res.status(201).json(newUser)
    }
    catch(error) {
        res.status(500).json({message: 'mistake on our side... sorry about that!'})
    }
})

// READ in CRUD
router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        if(users){
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: 'We can\'t find any users'})
        }
    } 
    catch(error) {
        res.status(500).json('Sorry we\'re working on this issue')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.getById(id)
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'we can\'t find that user'})
        }
    }
    catch(error) {
        res.status(500).json({message: 'looks like theres an issue on our side... we\'re working on it!'})
    }
})

// UPDATE in CRUD
router.put('/:id', checkName, async (req, res) => {
    const id = req.params.id;
    const info = req.body
    try {
        const updatedUser = await db.update(id, info)
        if(updatedUser) {
            res.status(202).json({message: 'your user has been updated'})
        } else {
            res.status(404).json({message: 'we can\'t find that user'})
        }
    }
    catch(error) {
        res.status(500).json({message: 'ahhhh sorry, we\'re having issues'})
    }
})

// DELETE in CRUD
router.delete("/:id", async (req, res) => {
    const id = (req.params.id)
    try {
      console.log(await db.remove(id));
      if (user > 0) {
        res.status(204);
      } else {
        res
          .status(404)
          .json({ message: 'we can\'t find that user' });
      }
    } catch (error) {
        console.log(await db.remove(id));
      res.status(500).json({ error: "user cant be removed sorry" });
    }
  });
  
module.exports = router;