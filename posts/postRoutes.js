// GET all users
router.get('/', (req, res) => {
    postDb.get().then(posts => {
        console.log(posts);
        res.status(200).json(posts);
     })
    .catch(error => res.status(500).send({ error: "The posts information could not be retrived."}));
});

// GET user by id
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id).then(post => {
        if(post.length === 0) {
            return res.status(404).send({ message: "The user with the specified id does not exist." });
        }
        res.status(200).json(post);
    })
    .catch(error => res.status(500).send({ error: "The user information could not be retrieved." }));
});

// //Post new user
router.post('/posts', upperCase, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser).then(userId =>
        res.status(200).json(newUser)
    )
    .catch(error => {
        if(!name) {
            return res.status(400).send({ errorMessage: "Please provide a name to create a new user." });
        } else if(!user) {
            res.status(422).send({ Error: `There is no user by this id ${userId}`});
        } else {
            res.status(500).send({ error: "There was an error while saving the new user to the database." });
        }
    })
})

//Delete
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id).then(deletedUser => {
        if(!deletedUser) {
            return res.status(404).send({ Error: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "You successfully deleted the user." });
        }
    })
    .catch(error => res.status(500).send({ error: "The user failed to delete." }));
 });

//Update
router.put('/users/:id', upperCase, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    userDb.update(id, newUser).then(user => {
        console.log(user);
        if(!name) {
            res.status(400).send({ errorMessage: "Please provide a name for the user." })
        } else if (!user) {
            res.status(404).send({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(req.body);
        }})
        .catch(error => res.status(500).send({ error: "User information could not be modified."}))
    });