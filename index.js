'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
var cors = require('cors')
const { Server } = require("socket.io");

const app = express();
app.use(express.static(path.join(__dirname, '/frontend/build')));

// configure cors
app.use(cors())

const server = createServer(app);
const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", async (socket) => {
  // const userId = await fetchUserId(socket);
  // console.log(userId)

  socket.on('sendIncrement', (num) => {
    console.log('emitting to teacher');
    socket.broadcast.emit('receiveIncrement', num);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
