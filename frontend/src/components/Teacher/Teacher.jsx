import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';

export const Teacher = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [increment, setIncrement] = useState(0)

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

  socket.on('receiveIncrement', receiveIncrement)

  function receiveIncrement(num) {
    console.log(`received ${num}`)
    setIncrement(increment + num)
  }
  
  return (
    <div className="App">
      <p>State: {'' + isConnected}</p>
      <div>{increment}</div>
    </div>
  );
}

