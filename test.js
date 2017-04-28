global.io=require('socket.io-client')
const { test } = require('tape')
const stack = require('stack-core')
const server = require('./test-server')
const stackSocket = require('./stack-socket')
const socketURL = 'http://localhost:5000'
const options = {
   transports: ['websocket'],
  'force new connection': true
}

stackSocket(stack, socketURL, options)

test('stack-socket', t => {  
  t.plan(1)
  stack.on('bad-path', (state, next) => {
    console.error(state._command)
    t.fail('bad-path was not fired but code ran anyway')
    next(null, state)
  })
  stack.on('pong', (state, next) => {
    t.pass('data received from server')
    next(null, state)
  })
  stack.fire('ping')
  setTimeout(server.close, 1000)
})

