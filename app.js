const express = require('express');
const http = require('http');
const cors = require('cors');
const webSocket = require('ws');
const { SocketLogger } = require('./logs/winston');
const { NewRoom } = require('./types/Room');

const room = NewRoom();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const cookie = req.headers.cookie;
  const [_, user] = cookie.split('=');

  room.join(ws);

  ws.on('message', (message) => {
    const jsonMsg = JSON.parse(msg);
    jsonMsg.Name = user;
    room.forwardMessage(jsonMsg);
  });

  ws.on('close', () => {
    room.leave(ws);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  SocketLogger.info(`Server is running on port ${PORT}`);
});
