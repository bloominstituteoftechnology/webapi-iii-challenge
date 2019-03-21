const postRouter = require('express').Router();

const db = require('./postDB.js');
// Return The array of posts
postRouter.get('/', (req, res) => {
    db.get()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed To Get Posts' });
      });
});

postRouter.get('/:id', async (req, res) => {
    try{
        const post = await db.getById(req.params.id)
        post
            ? res.status(200).json(post) 
            : res.status(404).json({message: "Can NOT find user"})
        
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Error communicating with server" });
    }
});

// Remove the Obj from the DB and return the removed object
postRouter.delete('/:id', (req, res) => {
    db.getById(req.params.id)
      .then(deletedPost => {
        deletedPost
          ?  db.remove(req.params.id).then(res.status(200).json(deletedPost))
          :  res.status(404).json({ message: "That Post doesn't exist" });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to remove post.' });
      });
});
// Add a new Post to the Db and Returns the new DB resource
postRouter.post('/', (req, res) => {
    const newPost = req.body;
    newPost
        ? db.insert(newPost)
            .then(dbPost => {res.status(201).json(dbPost)})
            .catch(err => {res.status(400).json({ message: 'Failed to add Post' })})
        : res.status(500).json({Message: 'Please provide title and contents for the post.'});
});
// Updates a post in the DB and Returns the number 1 if Successful
postRouter.put('/:id', (req, res) => {
    const { text, id } = req.body;

    db.getById(req.params.id)
        .then(post => {
            if (post) {
                if (text && id) {
                    db.update(req.params.id, req.body).then(post => {
                        res.status(200).json(post);
                    });
                } else {
                    res.status(404).json({message: 'Please provide a post'});
                }
            } else {
                res.status(404).json({ message: "That post doesn't exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update post' });
        });
});

module.exports = postRouter