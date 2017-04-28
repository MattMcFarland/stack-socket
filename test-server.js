const io = require('socket.io').listen(5000);

io.on('connection', function (socket) {
  console.log('connection from socket')
  socket.on('ping', data => {
    io.sockets.emit('pong')
  })
})

module.exports = {
  close: () => {
    process.exit(0)
  }
}
