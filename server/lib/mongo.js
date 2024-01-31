import Debug from 'debug'
import { MongoClient, ObjectId } from 'mongodb'
import { config } from '../config'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

const debug = Debug('app:mongodb'),
      //MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
      MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`

class MongoLib {
  constructor() {
    debug(MONGO_URI)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    this.client = new MongoClient(MONGO_URI, options)
    this.dbName = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if(error)
          reject(error)
        debug('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  test_connection(collection) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .findOne()
    })
  }

  getAll(collection, { query={}, skip=0, limit=0, projection={} } = {}) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .project(projection)
        .skip(skip)
        .limit(limit)
        .toArray()
    })
  }

  get(collection, id, projection={}) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) }, { projection })
    })
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data)
      })
      .then(result => result.insertedId)
  }

  update(collection, id, data, inc={}) {
    return this.connect()
      .then(db => {
        if(Object.keys(inc).length)
          return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $inc: inc, $set: data }, { upsert: true })
        else
         return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then(result => result.upsertedId || id)
  }

  updateInc(collection, id, inc) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $inc: inc }, { upsert: true })
      })
      .then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) })
      })
      .then(_ => id)
  }

  async populate(list, field, match, { projection={}, array=false }={}) {
    if (array) {
      for (const el of list)
        if (el[field])
          el[field] = await this.connect().then(db => {
            return db
              .collection(match)
              .find({ _id: {$in: el[field]} })
              .project(projection)
              .toArray()
          })
    }
    else {
      for (const el of list)
        if (el[field]) {
          el[field] = await this.connect().then(db => {
            return db.collection(match).findOne({ _id: ObjectId(el[field]) }, { projection })
          })
        }
    }
  }

  add(collection, id, field) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $addToSet: field })
      })
      .then(result => result.upsertedId || id)
  }

  remove(collection, id, field) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $pull: field })
      })
      .then(result => result.modifiedCount)
  }

  deleteAllByField(collection, query) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteMany(query)
      })
      .then(result => result.deletedCount)
  }
}

module.exports =  MongoLib
