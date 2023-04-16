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

io.on('connection', async (socket) => {
  // Send increment event
  socket.on('sendIncrement', (num) => {
    console.log('emitting to teacher');
    
    // should use rooms in the future
    socket.broadcast.emit('receiveIncrement', num);
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});