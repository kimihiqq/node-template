const { SocketLogger } = require('../logs/winston');

class Room {
  constructor() {
    this.forward = new Map();
    this.backward = new Set();
  }

  join(client) {
    SocketLogger.info('Client joined the room');
    this.clients.add(client);
  }

  leave(client) {
    SocketLogger.info('Client left the room');
    this.clients.delete(client);
  }

  forwardMessage(from, message) {
    for (const client of this.clients) {
      client.sent(JSON.stringify(message));
    }
  }
}

function NewRoom() {
  return new Room();
}

module.exports = { NewRoom };
