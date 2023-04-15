import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';

export const Student = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect()

    function onConnect() {
      console.log('connected to server')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function sendIncrement() {
    socket.emit('sendIncrement', 1)
  }

  return (
    <div className="App">
      <p>State: {'' + isConnected}</p>
      <button onClick={sendIncrement}>Send increment</button>
    </div>
  );
}

