import { ObjectId } from 'mongodb'
import MongoLib from '../lib/mongo'

class TipoAlimentos {
  constructor() {
    this.collection = 'tipoalimentos'
    this.mongoDB = new MongoLib()
  }

  async getAllCollection() {
    // Return array
    const data = await this.mongoDB.getAll(this.collection)
    /*for (const tipo of tipoAlimentos)
      if (unit['alimentos'])
        await this.mongoDB.populate(unit['conversions'], 'unit', 'units', { projection:{symbol:1} })*/
    return data
  }

  async createCollection(data) {
    // Return UnitId
    const id = await this.mongoDB.create(this.collection, data)
    return await this.mongoDB.get(this.collection, id)
  }

  async updateCollection(id, data) {
    // Return UnitId
    return await this.mongoDB.update(this.collection, id, data)
  }

  /*async delete(id) {
    // Return deletedUnitId and modifiedCount
    const talimentos = await this.mongoDB.getAll(this.collection)
    let modifiedCount = 0
    let deletedUnitId = ''
    for(const unit of units)
      if (unit['conversions'])
        for(const conversion of unit['conversions'])
          if (conversion['unit'] === id)
            modifiedCount = await this.mongoDB.remove(this.collection, unit['_id'], { conversions: {_id: ObjectId(conversion['_id'])} })
    deletedUnitId = await this.mongoDB.delete(this.collection, id)
    return { deletedUnitId, modifiedCount }
  }*/
}

export default TipoAlimentos

