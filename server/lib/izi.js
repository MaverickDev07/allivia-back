import constants from 'constants'
import crypto from 'crypto'
import request from 'request'
import Debug from 'debug'
import { config } from '../config'

const CLIENT_ID = config.clientId
const PUBLIC_KEY = config.publicKey

const debug = Debug('app:mongodb')

class IziLib {
  constructor() {
    debug('IZI Lib')
    this.clientId = CLIENT_ID
    this.publicKey = PUBLIC_KEY
  }

  getAuth(data) {
    let bufferData = Buffer.from(JSON.stringify(data), "utf8")
    let key = crypto.randomBytes(32)
    let iv = crypto.randomBytes(16)
    let cypher = crypto.createCipheriv('aes-256-cbc' , key, iv)
    let cryptedAES = Buffer.concat([cypher.update(bufferData), cypher.final()])
    let encryptedKey = crypto.publicEncrypt({key : this.publicKey, padding: constants.RSA_PKCS1_PADDING}, key)
    return `${this.clientId}:${encryptedKey.toString('base64')}:${iv.toString('hex')}${cryptedAES.toString('base64')}`
  }

  create(data, auth, endpoint) {
    let request_data = {
      method: 'POST',
      uri: `https://api.app.izifacturacion.com${endpoint}`,
      body: data,
      json: true,
      headers: {
        'Authorization' : auth,
        'Content-Type' : 'application/json'
      }
    }

    return new Promise(resolve => {
      request(request_data, (error, response, body) => {
        if(!error) {
          resolve({response, body})
        }
      })
    }).then(value => {
      return {
        status: value.response.statusCode,
        body: JSON.stringify( value.body, null, 4 )
      }
    })
  }
}

module.exports = IziLib
