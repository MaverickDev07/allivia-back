import MongoLib from '../lib/mongo'
import IziLib from '../lib/izi'

class IZI {
  constructor() {
    this.cllFacturas = 'facturas'
    this.cllCobros = 'cobros'
    this.mongoDB = new MongoLib()
    this.izi = new IziLib()
    this.endpointFacturas = '/v1/facturas'
    this.endpointCobros = '/v1/cobros'
  }

  async test() {
    const test = await this.mongoDB.test_connection(this.cllFacturas)
    return test || {}
  }

  async getAuth(data) {
    const auth = await this.izi.getAuth(data)
    return auth || {}
  }

  async getFacturas({ id, skip, limit, field } = {}) {
    // Return array
    let data = []
    if(id)
      data = await this.mongoDB.get(this.cllFacturas, id)
    else {
      const query = field ? { field } : {}
      data = await this.mongoDB.getAll(this.cllFacturas, { query, skip, limit })
    }
    return data
  }

  async getCobros({ id, skip, limit, field } = {}) {
    // Return array
    let data = []
    if(id)
      data = await this.mongoDB.get(this.cllCobros, id)
    else {
      const query = field ? { field } : {}
      data = await this.mongoDB.getAll(this.cllCobros, { query, skip, limit })
    }
    return data
  }

  async createFactura( data ) {
    const auth = this.izi.getAuth(data) // Genera has de authenticación
    console.log('Revisar 1:', auth)
    const result = await this.izi.create(data, auth, this.endpointFacturas) // Crea una factura en IZI
    console.log('Revisar 2:', result)
    if (result['status'] === 200 || result['status'] === 201) {
      const obj = JSON.parse(result.body)
      console.log('Revisar 3:', obj)
      const id = await this.mongoDB.create(this.cllFacturas, obj) // Guardo en la base de datos allivia
      return await this.mongoDB.get(this.cllFacturas, id) // retorna la factura guardada
    } else {
      return result
    }
  }

  async createCobro( data ) {
    const auth = this.izi.getAuth(data) // Genera has de authenticación
    const result = await this.izi.create(data, auth, this.endpointCobros) // Crea un Cobro en IZI
    console.log('Revisar:', result)
    if (result['status'] === 200 || result['status'] === 201) {
      const obj = JSON.parse(result.body)
      const id = await this.mongoDB.create(this.cllFacturas, obj) // Guardo en la base de datos allivia
      return await this.mongoDB.get(this.cllFacturas, id) // retorna la factura guardada
    } else {
      return result
    }
  }

  async updateExample( id, data ) {
    // Return ExampleId
    return await this.mongoDB.update(this.cllFacturas, id, data)
  }

  async deleteExample(id) {
    // Return deletedExampleId
    return await this.mongoDB.delete(this.cllFacturas, id)
  }
}

export default IZI
