const io = require('socket.io')()
const middleware = require('socketio-wildcard')();
io.use(middleware);

io.on('connection', function (socket) {
  socket.on('bing', data => {
    io.sockets.emit('pong', `${data}, world!`) 
  })
  // socket.on('*', packet => {
  //   console.log(packet)
  //   io.sockets.emit(packet.data[0], packet.data)
  // })
})

module.exports = {
  close: () => {
    process.exit(0)
  }
}

io.listen(5000)