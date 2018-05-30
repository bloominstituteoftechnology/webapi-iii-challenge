const db = require('./data/dbConfig.js');

class API {
    constructor({url}) {
        this.url = url
        this.endpoints = {}
    }

    createEntity(entity) {
        this.endpoints[entity] = this.createBasicCRUDEndpoints(entity)
    }

    createEntities(arrayOfEntity) {
        arrayOfEntity.forEach(each => this.createEntity(each))
    }

    createBasicCRUDEndpoints(name) {
        let endpoints = {}
        const resourceURL = `${this.url}/${name}}`

        endpoints.getAll = () => db(`${name}`)
        endpoints.getOne = ({ id }) => db(`${name}`).where({ id: Number(id) })
        endpoints.insert = ({ data }) => db(`${name}`).insert(data)
        
        // endpoints.update = ({ id, data, res }) => 
        //     db(`${name}`).where('id', Number(id)).update(updateObj)
        //     .then(response => {
        //         // return res
        //         const updatedPost = db.findById(id)
        //         .then(updatedPost => {
        //             res.status(200).json(updatedPost)
        //         })
        //         .catch(error => {
        //             res.status.json({ errorMessage: `The post is updated but cannot retrieve. Try reloading.`})
        //         })
        //     })
        //     .catch(error => {
        //         res.status(500).json({ errorMessage: `The post information could not be modified.` })
        //     })
        
        // endpoints.remove = (id) => 
        //     db(`${name}`).where('id', Number(id)).del()
        //     .then(response => {
        //         if (response != 0) {
        //             res.status(200).json({ response: `Deleted`})
        //         } else{
        //             res.status(404).json({ errorMessage: `The post with the specified ID does not exist.` })
        //         }
        //     })
        //     .catch(error => {
        //         res.status(500).json({ errorMessage: `The post could not be removed` })
        //     })

        return endpoints
    }
}

module.exports = API;