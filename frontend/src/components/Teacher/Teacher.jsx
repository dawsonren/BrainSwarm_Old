import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import HistogramChart from './Histogram';

export const Teacher = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [increment, setIncrement] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0, 0, 0]);
  const [rollCount, setRollCount] = useState(0);

  const data = counters;
  const labels = ['1', '2', '3', '4', '5', '6'];
  const backgroundColor = 'rgba(75, 192, 192, 0.5)';
  const borderColor = 'rgba(75, 192, 192, 1)';
  const borderWidth = 1;

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log('connected to server');
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

  useEffect(() => {
    socket.on('receiveIncrement', receiveIncrement);
    socket.on('receiveOne', receiveOne);
    socket.on('receiveTwo', receiveTwo);
    socket.on('receiveThree', receiveThree);
    socket.on('receiveFour', receiveFour);
    socket.on('receiveFive', receiveFive);
    socket.on('receiveSix', receiveSix);

    return () => {
      socket.off('receiveIncrement', receiveIncrement);
      socket.off('receiveOne', receiveOne);
      socket.off('receiveTwo', receiveTwo);
      socket.off('receiveThree', receiveThree);
      socket.off('receiveFour', receiveFour);
      socket.off('receiveFive', receiveFive);
      socket.off('receiveSix', receiveSix);
    };
  }, [counters]);

  function receiveIncrement(num) {
    console.log(`received ${num}`);
    setIncrement(increment + num);
  }

  function updateCounter(index) {
    return () => {
      setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[index] += 1;
        return newCounters;
      });
      setRollCount((prevRollCount) => prevRollCount + 1);
    };
  }

  const receiveOne = updateCounter(0);
  const receiveTwo = updateCounter(1);
  const receiveThree = updateCounter(2);
  const receiveFour = updateCounter(3);
  const receiveFive = updateCounter(4);
  const receiveSix = updateCounter(5);

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
};
