import { Server, Socket } from 'socket.io'

let io: Socket
module.exports = {
  init: (server: Server) => {
    io = require('socket.io')(server)
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized')
    }
    return io
  },
}
