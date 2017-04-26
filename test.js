var t = require('tape')

var stack = require('stack-core')

require('./stack-socket.js')(stack)

stack.on('red light', (state, next) => {
  console.log('red light')
  next(null, state)
})

stack.on('blue light', (state, next) => {
  console.log('blue light')
  next(null, state)  
})

stack.fire('red light')
stack.fire('blue light')
