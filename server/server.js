#!/usr/bin/env node

/**
 * Run prerequirements
 */

require('./config/application.config').initialConfigs()

/**
 * Module dependencies.
 */

const {SERVER_PORT, APP_NAME, LOG_FOLDER_PATH} = require('./config/constants')
const {logger} = require('./util/logger.util.js')
const app = require('./app')
const debug = require('debug')('mnm:server')
const http = require('http')


/**
* Get port from environment and store in Express.
*/
 
const port = normalizePort(process.env.PORT || SERVER_PORT)
app.set('port', port)

/**
* Create HTTP server.
*/

var server = http.createServer(app)

/**
* Listen on provided port, on all network interfaces.
*/

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
* Print startup information
*/

logger.basic('Starting', APP_NAME)
logger.basic('Listening:', port)
logger.basic('Environment:', process.env.DEV 
  ? 'Development' 
  : 'Production')
logger.basic('Log folder:', LOG_FOLDER_PATH)
