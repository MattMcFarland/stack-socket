module.exports = (stack, socketURL, options, done) => {
  const client = io.connect(socketURL, options)
  const patch = require('socketio-wildcard')(io.Manager);
  patch(client);
  stack.on('*wild', (state, next) => {
    console.log(state._command.path, 'triggered')
    if (client.connected) {
      client.emit(state._command.path, objectOrNull(state.payload))
      next(null, state)
    } else {
      client.on('connect', () => {
        client.emit(state._command.path, objectOrNull(state.payload))
        client.on('*', (event) => {
          state.data = event.data.slice(1)
          state.client = client
          stack.fire(event.data[0])
        })        
        next(null, state)
      })
    }
  })
}

function objectOrNull(object) {
  return object ? object : null
}


