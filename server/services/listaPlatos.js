import MongoLib from '../lib/mongo'

class ListaPlatos {
  constructor() {
    this.collection = 'listaplatos'
    this.mongoDB = new MongoLib()
  }
  
  async getAll({ id, skip, limit, field } = {}) {
    // Return array
    let data = []
    if(id)
      data = await this.mongoDB.get(this.collection, id)
    else {
      const query = field ? { field } : {}
      data = await this.mongoDB.getAll(this.collection, { query, skip, limit })
    }
    return data
  }

  async create(_data) {
    // Return ExampleId
    const id = await this.mongoDB.create(this.collection, _data)
    return await this.mongoDB.get(this.collection, id)
  }
}

export default ListaPlatos

