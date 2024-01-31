var constants = require('constants');
var crypto = require('crypto');

var data = {
	"emisor": "000001111",
	"comprador": "4300000",
	"razonSocial": "Comprador Prueba",
	"listaItems": [
		{
			"articulo": "Artículo de Prueba",
			"cantidad": 1,
			"precioUnitario": 12
		}
	],
	"descuentos": 0,
	"tipoCompra": 1
}

var bufferData = Buffer.from(JSON.stringify(data), "utf8");

var key = crypto.randomBytes(32);
var iv = crypto.randomBytes(16);

var clientId = 'f550a745-3c54-4c28-9828-d92333bbad7d';
var publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/js1CGxBR9nYgAu27zXoLFF4M
YMtr9F7oDFee3sUxa5Q5CIqi7Bq7plIYWoiDy5Wxn9Q4kXN5pf6zyrXJiSAFh8Ic
rH5n7QnyIWTx9wVPmha+k5bLcmeHPVTxZAsoRuYxuCR74nynAYLLoqT40Jo0Y5g7
JHB4NoNPKajZO4UjtwIDAQAB
-----END PUBLIC KEY-----`;

var cypher = crypto.createCipheriv('aes-256-cbc' , key, iv);
var cryptedAES = Buffer.concat([cypher.update(bufferData), cypher.final()]);

var encryptedKey = crypto.publicEncrypt({key : publicKey, padding: constants.RSA_PKCS1_PADDING}, key);

var auth = clientId + ":" + encryptedKey.toString('base64') + ":" + iv.toString('hex') + cryptedAES.toString('base64');

// console.log('auth: ', auth);

var request = require('request');

request({
  method: 'POST' ,
  uri: 'https://api.app.izifacturacion.com/v1/facturas',
  body: data,
  json: true,
  headers: {
    'Authorization' : auth,
    'Content-Type' : 'application/json'
  }
}, function (error, response, body) {
  console.log("result.status:", response.statusCode);
  console.log("result.body:"+JSON.stringify( body, null, 4 ));
});
