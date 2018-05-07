const express = require('express');
const router = express.Router();
const db = require('./data/helpers/userDb');



router.get('/', (req, res) => {
    db
        .get()
        .then(p => {
            res.json(p)
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db
        .get(id)
        .then(pId => {
            if (pId.length === 0) {
                res.status(404).json({ msg: " user not found" })
            }
            else {
                res.status(200).json(pId)
            }
        })
        .catch(err => {
            res.status(404).json({
                msg: "user not found"
            })
        })
})


// router.get("/:id/posts", (req, res) => {
//     const id = req.params.id;
//     db
//         .get(id)
//         .then(user => {
//             if (user) {
//                 db.getUserPosts(id).then(posts => res.json(posts));
//             } else {
//                 res
//                     .status(404)
//                     .json({ message: "The user with the specified ID does not exist." });
//             }
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ error: "The user information could not be retrieved." });
//         });
// });


router.post('/', (req, res) => {
    const obj = { name: req.body.name }

    db
        .insert(obj)
        .then(p => {
            res.status(200).json({ msg: ' a new user is  added' })
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

router.put('/:id', (req, res) => {
    const obj = {
        name: req.body.name

    }

    const { id } = req.params
    db
        .update(id, obj)
        .then(p => {
            if (obj.text !== '' && obj.userId !== '') {
                res.status(200).json({ msg: 'user is updated' })
            }
        })
        .catch(err => {
            res.status(404).json({
                msg: " user not found"
            })
        })

})


router.delete("/:id", (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(p => {
            res.status(200).json({
                msg: ` the user with  id:"${id}" is deleted`
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: 'user not found '
            })
        })

})





module.exports = router;