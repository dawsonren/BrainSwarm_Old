'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname, '/frontend/build')));

// configure cors
app.use(cors());

const server = createServer(app);
const io = new Server(4000, {
  cors: {
    origin: 'http://localhost:3000',
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
  console.log('Listening on http://0.0.0.0:8080');
});
