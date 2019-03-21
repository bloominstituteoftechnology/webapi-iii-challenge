const userRouter = require('express').Router();

const db = require('./userDb.js');

const prepUsername = (req, res, next) => {
  const username = req.body.name[0].toUpperCase() + req.body.name.slice(1);
  req.body.name = username;
  next();
}

userRouter.get('/', async (req,res) => {
    try{
        const users = await db.get();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message: err});
    }
})
userRouter.get('/:id', async (req, res) => {
    try{
        const user = await db.getById(req.params.id);
        user.id
            ? res.status(200).json(user)
            : res.status(404).json({message: "That user doesn't exist"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to communicate with server"})
    }
})
userRouter.delete('/:id', async (req, res) => {
    try{
        const user = await db.remove(req.params.id);
        user
            ? res.status(200).json(user)
            : res.status(404).json ({message: "User not found"})
    }catch(err){
        console.log(err);
        res.status(500).json({message: `Failed to communicate with server due to \n**${err}**`})
    }
})
userRouter.post('/', prepUsername, (req, res) => {
    const user = req.body
        db.insert(user)
            .then(dbUser => {user.name ? res.status(200).json(dbUser) : res.status(400).json({message: "Can NOT add User"})})
            .catch(err => {res.status(500).json({message: `Failed to communicate with server due to \n**${err}**`})})
})
userRouter.put('/:id', prepUsername, (req, res) => {
    db.update(req.params.id, req.body)
        .then(count => {count ? res.status(200).json(count) : res.status(400).json({message: "Can NOT find User"}) })
        .catch(err => { res.status(500).json({message: `Failed to communicate with server due to \n**${err}**`}) })
})

userRouter.get('/:id/posts', async (req, res) => {
    db.getUserPosts(req.params.id)
    .then(posts => { posts.length > 0 ? res.status(200).json(posts) : res.status(400).json({message: "Can NOT find User"})})
    .catch(err => { res.status(500).json({message: `Failed to communicate with server due to \n**${err}**`})})
})
// I am stupid and did this twice because I added an S to the end point :)

// userRouter.get('/:id/posts', async (req, res) => {
//     try {
//       const user = await db.getById(req.params.id);
//       if (user) {
//           const posts = await db.getUserPosts(id);
//           res.status(200).json(posts);
//     } else {
//         res.status(404).json({ message: 'The user with the specified ID does not exist.' });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "The user's posts could not be retrieved." });
//     }
//   });
module.exports = userRouter;