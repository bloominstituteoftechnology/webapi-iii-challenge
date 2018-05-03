const express = require("express");
const router = express.Router();
const tagDb = require("../data/helpers/tagDb.js")


let upperCaseTags = (req, res, next) => {
    if(req.method === "POST") {
        req.body.tag = req.body.tag.toUpperCase()
        console.log(req.body.tag)
    }
    next()
}

router.use(express.json())
router.use(upperCaseTags)


router.get('/', (req, res) => {
    tagDb.get().then(tags => {
        res.json(tags);
    }).catch(err => {

        res.status(500).json({
            error: "The tags could not be found"
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    tagDb.get(id).then(tag => {
        if(tag.tag.length > 0) {
            res.json(tag);
        } else {
            res.status(404).json({
                message: "Please insert a tag"
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: "The specified tags for the user could not be found"
        })
    })
})


router.post('/', (req, res) => {
    tag = req.body;

    if(tag.tag.length === 0) {
        res.status(500).json({
            message: "Please insert a tag"
        })
    }else {
        tagDb.insert(tag).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            res.status(500).json({
                error: "There was en error creating a new tag to the database"
            })
        })
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const tagUpdate = req.body;

    tagDb.update(id, tagUpdate).then(response => {
        res.status(200).json({
            Sucess: "Tag has been updated"
        })
    }).catch(err => {
        res.status(500).json({
            error: "Tags update failed"
        })
    })
})



router.delete('/:id', (req, res) => {
    const id = req.params.id;

    tagDb.remove(id).then(response => {
        res.status(200).json({
            Deleted: "tag has been deleted from the database"
        })
    })
})


module.exports = router;