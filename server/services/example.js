import MongoLib from '../lib/mongo'

class Example {
  constructor() {
    this.collection = 'test'
    this.mongoDB = new MongoLib()
  }

  async test() {
    const test = await this.mongoDB.test_connection(this.collection)
    return test || {}
  }

  async getExamples({ id, skip, limit, field } = {}) {
    // Return array
    const data = []
    if(id)
      data = await this.mongoDB.get(this.collection, id)
    else {
      const query = field ? { field } : {}
      data = await this.mongoDB.getAll(this.collection, { query, skip, limit })
    }
    return data
  }

  async createExample({ _data }) {
    // Return ExampleId
    return await this.mongoDB.create(this.collection, _data)
  }

  async updateExample({ id, data }) {
    // Return ExampleId
    return await this.mongoDB.update(this.collection, id, data)
  }

  async deleteExample(id) {
    // Return deletedExampleId
    return await this.mongoDB.delete(this.collection, id)
  }
}

export default Example
