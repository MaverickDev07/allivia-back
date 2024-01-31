import { ObjectId } from 'mongodb'
import MongoLib from '../lib/mongo'
import { datosExcel } from '../utils/readXLSX'

class Alimentos {
  constructor() {
    this.collection = 'tipoalimentos'
    this.mongoDB = new MongoLib()
  }

  async createCollection(id, data) {
    // Return UnitId
    data['_id'] = ObjectId()
    const _ = await this.mongoDB.add(this.collection, id, { alimentos: data })
    // return data['_id']
    return data
  }

  async llenarAlimentos(idTipoAlimentos) {
    for ( let alimento of datosExcel() ) {
      await this.createCollection(idTipoAlimentos, alimento)
    }
    return datosExcel()
  }

  async deleteCollection(tipoAlimentoId, alimentoId) {
    // Return modifiedCount
    return await this.mongoDB.remove(this.collection, tipoAlimentoId, { alimentos: { _id: ObjectId(alimentoId) } })
  }
}

export default Alimentos
