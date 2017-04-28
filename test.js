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
  t.test('can send and receive data', t => {
    stack.on('/socket/ping', (state, next) => {
      t.pass('data sent to server')
      next(null, state)
    })
    stack.on('pong', (state, next) => {
      t.equal(state.data[0], 'hello, world!', 'data received from server')
      next(null, state)
      t.end()
      server.close()
    })
    stack.fire('/socket/ping', { payload: 'hello'})
  })
})

