const io = require('socket.io').listen(5000);

io.on('connection', function (socket) {
  console.log('connection from socket')
  socket.emit('ping')
  socket.on('ping', data => {
    console.log('ping received', data)
    socket.emit('pong', data)
  })
})

module.exports = {
  close: () => {
    process.exit(0)
  }
}
