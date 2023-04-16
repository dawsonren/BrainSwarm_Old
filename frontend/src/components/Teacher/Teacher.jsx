import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import HistogramChart from './Histogram';

export const Teacher = () => {
  const [increment, setIncrement] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0, 0, 0]);
  const [rollCount, setRollCount] = useState(0);

  // lifecycle
  useEffect(() => {
    socket.connect();

    return () => {
      // disconnect
    };
  }, []);

  useEffect(() => {
    socket.on('receiveIncrement', receiveIncrement);

    return () => {
      socket.off('receiveIncrement', receiveIncrement);
    };
  }, [counters]);

  function receiveIncrement(num) {
    console.log(`received ${num}`);
    setIncrement(increment + num);
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[num - 1] += 1;
      return newCounters;
    });
    setRollCount((prevRollCount) => prevRollCount + 1);
  }

  return (
    <div className="App">
      <div className="d-flex flex-row justify-content-between">
        <div>Sample Mean: {rollCount === 0 ? 0 : Math.round(increment * 100 / rollCount) / 100}</div>
        <div>True Mean: 3.5</div>
      </div>
      <h1>Histogram</h1>
      <HistogramChart data={counters} />
    </div>
  );
};
