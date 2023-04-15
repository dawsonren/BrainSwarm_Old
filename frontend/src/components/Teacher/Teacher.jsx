import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import HistogramChart from './Histogram';

export const Teacher = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [increment, setIncrement] = useState(0)

  const data = [10, 20, 30, 15, 20, 10];
  const labels = ['1', '2', '3', '4', '5', '6'];
  const backgroundColor = 'rgba(75, 192, 192, 0.5)';
  const borderColor = 'rgba(75, 192, 192, 1)';
  const borderWidth = 1;

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
      <h1>Histogram</h1>
      <HistogramChart 
        data={data} 
        labels={labels} 
        backgroundColor={backgroundColor} 
        borderColor={borderColor} 
        borderWidth={borderWidth} 
      />
    </div>
  );
}

