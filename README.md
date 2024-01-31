# MANAGEMENT BACK

## Sobre el proyecto

Esta iniciativa nace con el propósito de poder crear diferentes módulos de back-end para funcionalidades de compra y venta, en general.

### Conversiones

- 1kl equivale a 1000 gramos
- 1kl equivale a 2.20462 libras
- 1kl equivale a 2.875575 cuartilla
- 1kl equivale a 0.088 arrobas

### Scripts
```js
mongo
>db.createUser({
  user:"dbgary",
  pwd: "passmongo",
  roles:["dbOwner"]
})

>db.units.updateOne({
  _id: ObjectId("5f0823d0f90b913dde20ac92")
},
{
  $addToSet: {
    pruebas: { _id: ObjectId(), quantity: 150.5, unit: "5f0823dbf90b913dde20ac93" }
  }
})

mongo --username dbgary --password passmongo --authenticationDatabase admin --host localhost --port 27017

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}
```
