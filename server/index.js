import Debug from 'debug'
import app from './app'
import { config } from './config'
import { createServer } from 'http'

const debug = Debug('app:server'),
      server = createServer(app)

function start() {
  // Server
  server.listen(config.port, _ => {
    debug(`Listening http://localhost:${server.address().port}`)
  })
}

start()
