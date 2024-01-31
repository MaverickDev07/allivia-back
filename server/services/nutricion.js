import { ObjectId } from 'mongodb'
import MongoLib from '../lib/mongo'
import { dateTime } from '../utils/plus'

class Nutricion {
  constructor() {
    this.collection = 'nutricion'
    this.mongoDB = new MongoLib()
  }

  async getAll({ id, skip, limit, field } = {}) {
    // Return array
    let data = []
    if(id)
      data = await this.mongoDB.get(this.collection, id)
    else {
      // const query = field ? { field } : {}
      if (field['usuarioId'])
        field['usuarioId'] = parseInt(field['usuarioId'])
      if (field['fechaFin']) {
        let fechaInicio = new Date(field['fecha'])
        let fechaFin    = new Date(field['fechaFin'])
        let fecha = ''
        let mes = 0, dia = 0
        let res = []

        while(fechaFin.getTime() >= fechaInicio.getTime()) {
            fechaInicio.setDate(fechaInicio.getDate() + 1)
            mes = fechaInicio.getMonth() + 1
            dia = fechaInicio.getDate()
            if (mes < 10) mes = `0${mes}`
            if (dia < 10) dia = `0${dia}`
            fecha = `${fechaInicio.getFullYear()}-${mes}-${dia}`

            res = await this.mongoDB.getAll(this.collection, { query: { usuarioId: field['usuarioId'], fecha }, skip, limit })
            if (res.length)
              data.push(res[0])
        }
      } else
        data = await this.mongoDB.getAll(this.collection, { query: field, skip, limit })
    }
    return data
  }

  async create(_data) {
    // Return nutricion created
    _data['alimentos_agregados'] = []
    _data['vasos_agua'] = 0
    const id = await this.mongoDB.create(this.collection, _data)
    return await this.mongoDB.get(this.collection, id)
  }

  async addAlimentos(usuarioId, alimentoId, fecha) {
    // Return
    // const fecha = dateTime().toISOString().slice(0,10)
    const nutricion = await this.mongoDB.getAll(this.collection, { query: { usuarioId, fecha } })
    const data = {
      fecha,
      usuarioId
    }
    let result = {}
    let encuentra = false

    if (nutricion.length)
      for (const n of nutricion) {
        if (n['alimentos_agregados'].length) {
          for (const ag of n['alimentos_agregados']) {
            if (ag['alimentoId'] === alimentoId) {
              encuentra = true
              result = await this.mongoDB.remove(this.collection, n['_id'], { alimentos_agregados: { _id: ObjectId(ag['_id']) } })
              result = await this.mongoDB.add(this.collection, n['_id'], { alimentos_agregados: { _id: ObjectId(ag['_id']), alimentoId, cantidad: ag['cantidad']+1 } })
            }
          }
          if (!encuentra)
            result = await this.mongoDB.add(this.collection, n['_id'], { alimentos_agregados: { _id: ObjectId(), alimentoId, cantidad: 1 } })
        } else {
          result = await this.mongoDB.add(this.collection, n['_id'], { alimentos_agregados: { _id: ObjectId(), alimentoId, cantidad: 1 } })
        }
      }
    else {
      result = await this.create(data)
      result = await this.mongoDB.add(this.collection, result['_id'], { alimentos_agregados: { _id: ObjectId(), alimentoId, cantidad: 1 } })
    }

    return result
  }

  async addVasosAgua(usuarioId, fecha) {
    // const fecha = dateTime().toISOString().slice(0,10)
    const nutricion = await this.mongoDB.getAll(this.collection, { query: { usuarioId, fecha } })
    const data = {
      fecha,
      usuarioId
    }
    let result = {}

    if (nutricion.length)
      for (const n of nutricion) {
        result = await this.mongoDB.updateInc(this.collection, n['_id'], { vasos_agua: 1 })
      }
    else {
      result = await this.create(data)
      result = await this.mongoDB.updateInc(this.collection, result['_id'], { vasos_agua: 1 })
    }

    return result
  }

  async subVasoAgua(usuarioId, fecha) {
    const nutricion = await this.mongoDB.getAll(this.collection, { query: { usuarioId, fecha } })
    let result = {}

    if (nutricion.length)
      for (const n of nutricion)
        result = await this.mongoDB.updateInc(this.collection, n['_id'], { vasos_agua: -1 })

    return result
  }

  /*async updateExample({ id, data }) {
    // Return ExampleId
    return await this.mongoDB.update(this.collection, id, data)
  }*/

  async deleteAlimentos(usuarioId, alimentoId, fecha) {
    if (typeof(usuarioId) == 'string') usuarioId = Number(usuarioId)
    const nutricion = await this.mongoDB.getAll(this.collection, { query: { usuarioId, fecha } })
    let result = 0

    if (nutricion.length)
      for (const n of nutricion) {
        if (n['alimentos_agregados'].length) {
          for (const ag of n['alimentos_agregados']) {
            if (ag['alimentoId'] === alimentoId) {
              result = await this.mongoDB.remove(this.collection, n['_id'], { alimentos_agregados: { _id: ObjectId(ag['_id']) } })
            }
          }
        }
      }

    return result
  }

}

export default Nutricion
