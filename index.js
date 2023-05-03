'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname)));


// configure cors
app.use(cors());

const server = createServer(app);
const io = new Server(4000, {
  cors: {
    // origin: 'http://localhost:3000',
    origin: 'https://whale-app-7g3e9.ondigitalocean.app:3000',
    methods: ['GET', 'POST']
  }
});

const rooms = {}
const users = []

io.on('connection', (socket) => {
  console.log("a user connected")
  console.log('rooms', io.sockets.adapter.rooms)

  socket.on('new room', (callback) => {
    // create a randon room 

    const roomID = Math.floor(Math.random() * 90000) + 10000;

    // associate the socket with a room
    // socket.join(roomID)

    // add the room to the array
    rooms[roomID] = [{ username: 'teacher', socketId: socket.id, type: 'host' }]

    console.log('socketrooms', socket.rooms)

    // use the callback function to respond the client with room name
    callback({'roomID': roomID, 'users': rooms[roomID]})
  })

  // Send increment event
  socket.on('sendIncrement', (num) => {
    // should use rooms in the future
    socket.broadcast.emit('receiveIncrement', num);
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});