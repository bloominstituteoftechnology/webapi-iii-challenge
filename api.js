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
        endpoints.update = ({ id, data }) => db(`${name}`).where('id', Number(id)).update(data)        
        endpoints.remove = ({id}) => db(`${name}`).where('id', Number(id)).del()
        return endpoints
    }
}

module.exports = API;