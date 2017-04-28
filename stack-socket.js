module.exports = (stack, socketURL, options, done) => {
  const client = io.connect(socketURL, options)
  const patch = require('socketio-wildcard')(io.Manager);
  patch(client);
  stack.on('/socket/:eventName', (state, next) => {
    if (client.connected) {
      client.emit(state._command.eventName, objectOrNull(state.payload))
      next(null, state)
    } else {
      client.on('connect', () => {
        client.emit(state._command.eventName, objectOrNull(state.payload))
        client.on('*', (event) => {          
          stack.fire(event.data[0], { data: event.data.slice(1) })
        })
        next(null, state)
      })
    }
  })
}

function objectOrNull(object) {
  return object ? object : null
}


